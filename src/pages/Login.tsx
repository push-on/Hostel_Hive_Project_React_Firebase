import { useContext, useState } from "react"
import { auth, db, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { AuthContext } from "../context/AuthContext"
import { motion } from "framer-motion"
import { doc, getDoc } from "firebase/firestore"
import { FcGoogle } from "react-icons/fc"
import { MdEmail } from "react-icons/md"
import NavBar from "../components/NavBar"
import Lottie from "lottie-react"
import LoginLotiAnim from "../assets/lottie/animation.json"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { currentUser, dispatch } = useContext(AuthContext)
  const { state } = useLocation()

  function navigateTo(role: string) {
    if (state) {
      navigate(state.from)
      return
    }
    switch (role) {
      case "admin":
        navigate("/dashboard")
        break
      case "staff":
        navigate("/staff")
        break
      case "student":
        navigate("/student")
        break
      default:
        navigate("/")
        break
    }
  }

  const signInWithGoogle = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(
      signInWithPopup(auth, googleProvider).then((userCredentials) => {
        const user = userCredentials.user
        getDoc(doc(db, "users", user.uid)).then((doc) => {
          dispatch({
            type: "LOGIN",
            payload: user,
            role: doc.data()?.role,
            paymentStatus: doc.data()?.paymentStatus,
          })
          navigateTo(doc.data()?.role)
        })
      }),
      {
        loading: "Login...",
        success: <b>Login successful!</b>,
        error: <b>Login failed.</b>,
      }
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const user = userCredentials.user
          getDoc(doc(db, "users", user.uid))
            .then((doc) => {
              dispatch({
                type: "LOGIN",
                payload: user,
                role: doc.data()?.role,
                paymentStatus: doc.data()?.paymentStatus,
              })
              navigateTo(doc.data()?.role)
            })
            .catch((error: any) => {
              toast.error(error.message)
            })
        }
      ),
      {
        loading: "Login...",
        success: <b>Login successful!</b>,
        error: <b>Login failed.</b>,
      }
    )
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
          {currentUser !== null ? (
            <Link className="close" to="/dashboard"></Link>
          ) : (
            <Link className="close" to="/"></Link>
          )}
          <hgroup>
            <h2>Login</h2>
            <p>Login to your account </p>
          </hgroup>
          <article>
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
            <form onSubmit={handleSubmit}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                />
              </label>
              <button type="submit">
                <MdEmail /> Login with Email
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
                    <FcGoogle /> Login with Google
                  </button>
                </li>
              </ul>
              <ul>
                <li>
                  Don't Have an Account ? <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </nav>
          </footer>
        </motion.article>
      </article>
    </div>
  )
}
