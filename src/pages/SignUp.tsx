import { useState } from "react"
import { auth, db, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { collection, doc, setDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { FcGoogle } from "react-icons/fc"
import { MdEmail } from "react-icons/md"
import NavBar from "../components/NavBar"
import Lottie from "lottie-react"
import LoginLotiAnim from "../assets/lottie/animation2.json"
export default function SignUp() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const [isState, setState] = useState("student")
  const studentsCollection = collection(db, "students")
  const staffCollection = collection(db, "staffs")
  const usersCollection = collection(db, "users")

  const createRole = async (id: string, userRole: string | null) => {
    await setDoc(doc(usersCollection, id), {
      role: userRole,
      paymentStatus: false,
      userID: id,
    }).catch((error) => {
      toast.error(error.message)
    })
  }

  const createUser = async (
    id: string,
    name: string | null,
    userEmail: string | null
  ) => {
    if (isState === "student") {
      await setDoc(doc(studentsCollection, id), {
        student_name: name === null ? "" : name,
        student_email: userEmail,
        hostel_floor: "",
        hostel_room: "",
        address: "",
        phone: "",
        guardian_name: "",
        emergency_num: "",
        gender: "",
        religion: "",
        nationality: "",
        booked: false,
        created_at: new Date()
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
        userID: id,
      }).catch((error) => {
        toast.error(error.message)
      })
    } else if (isState === "staff") {
      await setDoc(doc(staffCollection, id), {
        staff_name: name === null ? "" : name,
        staff_email: userEmail,
        created_at: new Date()
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
        userID: id,
      }).catch((error) => {
        toast.error(error.message)
      })
    } else {
      toast.error("Please select user type")
    }
  }

  const signInWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInWithPopup(auth, googleProvider)
      .then((userCredentials) => {
        const user = userCredentials.user
        createUser(user?.uid, user?.displayName, user?.email)
        createRole(user?.uid, isState)
        toast.success("sign up successfully")
        setTimeout(() => {
          navigate("/login")
        }, 600)
      })
      .catch((error: any) => {
        toast.error(error.message)
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password didn't match")
      return
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        createUser(user?.uid, fullName, user?.email)
        createRole(user?.uid, isState)
        toast.success("sign up successfully")
        setTimeout(() => {
          navigate("/login")
        }, 1000)
      })
      .catch((error: any) => {
        toast.error(error.message)
      })
  }

  return (
    <div className="container">
      <NavBar />
      <Toaster />
      <article className="grid">
        <motion.article
          className="center sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}>
          <Lottie animationData={LoginLotiAnim} />
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-10%" }}
          transition={{ ease: "easeInOut", duration: 0.2 }}>
          <Link className="close" to="/"></Link>
          <Link
            to={"/"}
            style={{
              position: "absolute",
              backgroundColor: "#2d3748",
              color: "#f9fafb",
              borderRadius: "50%",
              padding: "0.25rem",
              right: "0.75rem",
              top: "0.75rem",
            }}>
            <svg
              style={{
                width: "1.5rem",
                height: "1.5rem",
                transition: "transform 500ms",
                transformOrigin: "center",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />{" "}
            </svg>
          </Link>
          <hgroup>
            <h2>Signup</h2>
            <p>Create a new account</p>
          </hgroup>
          <article>
            <UserSlector isState={isState} setState={setState} />
            <form onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="user name"
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                />
              </label>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  aria-invalid={
                    password === confirmPassword && password !== ""
                      ? false
                      : undefined
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                />
                {password === confirmPassword && password !== "" ? (
                  <small id="valid-helper">Password matched</small>
                ) : (
                  <small></small>
                )}
              </label>
              <label htmlFor="password">
                Conform your password
                <input
                  type="password"
                  aria-invalid={
                    password === confirmPassword && password !== ""
                      ? false
                      : undefined
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="********"
                />
                {password === confirmPassword && password !== "" ? (
                  <small id="valid-helper">Password matched</small>
                ) : (
                  <small></small>
                )}
              </label>
              <button type="submit">
                <MdEmail /> SignUp with Email
              </button>
            </form>
          </article>
          <footer>
            <nav>
              <ul>
                <li>
                  <button
                    className="secondary outline"
                    onClick={signInWithGoogle}>
                    <FcGoogle /> Signup with Google
                  </button>
                </li>
              </ul>
              <ul>
                <li>
                  Don't an Account ? <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
          </footer>
        </motion.article>
      </article>
    </div>
  )
}

function UserSlector({
  isState,
  setState,
}: {
  isState: string
  setState: Function
}) {
  return (
    <div role="group" style={{ width: "100%" }}>
      <button
        className={`outline ${isState === "student" ? "" : "secondary"}`}
        onClick={() => {
          setState("student")
        }}>
        Student
      </button>
      <button
        className={`outline ${isState === "staff" ? "" : "secondary"}`}
        onClick={() => {
          setState("staff")
        }}>
        Staff
      </button>
    </div>
  )
}
