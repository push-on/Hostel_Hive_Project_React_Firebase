import { doc, getDoc, updateDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { db } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function StudentSettings() {
  const { currentUser } = useContext(AuthContext)
  const [User, setUser] = useState<any>()
  const [userName, setUserName] = useState("")
  const [adress, setAdress] = useState("")
  const [phone, setPhone] = useState("")
  const [gurdian_name, setGurdian_name] = useState("")
  const [gender, setGender] = useState("")
  const [emergency_number, setEmergency_number] = useState("")
  const [religion, setReligion] = useState("")
  const [Nationality, setNationality] = useState("")
  const navigate = useNavigate()

  const getData = async () => {
    const uid = currentUser?.uid as string
    if (uid) {
      const docRef = doc(db, "students", uid)
      getDoc(docRef)
        .then((doc) => {
          setUser(doc.data())
          setUserName(doc.data()?.student_name)
          setAdress(doc.data()?.adress)
          setPhone(doc.data()?.phone)
          setGurdian_name(doc.data()?.guardian_name)
          setGender(doc.data()?.gender)
          setEmergency_number(doc.data()?.emergency_num)
          setReligion(doc.data()?.religion)
          setNationality(doc.data()?.nationality)
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
          console.log(error)
        })
    } else {
      toast.error("UID Not Found")
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const uid = currentUser?.uid as string
    const docRef = doc(db, "students", uid)
    try {
      updateDoc(docRef, {
        student_name: userName,
        adress: adress,
        phone: phone,
        guardian_name: gurdian_name,
        gender: gender,
        emergency_num: emergency_number,
        religion: religion,
        nationality: Nationality,
      })
        .then(() => {
          getData()
          toast.success("Updated Successfully")
          navigate("/student", { replace: true })
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } catch (error: any) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <hgroup>
        <h1>Settings</h1>
        <p>Student Profile</p>
      </hgroup>

      <form>
        <article>
          <label>Full Name</label>
          <input
            type="text"
            value={userName}
            placeholder={User?.student_name}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Adress</label>
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            placeholder={User?.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Gurdian Name</label>
          <input
            type="text"
            value={gurdian_name}
            placeholder={User?.gurdian_name}
            onChange={(e) => setGurdian_name(e.target.value)}
          />
          <label>Gender</label>
          <input
            type="text"
            value={gender}
            placeholder={User?.gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label>Emergency Number</label>
          <input
            type="text"
            value={emergency_number}
            placeholder={User?.emergency_number}
            onChange={(e) => setEmergency_number(e.target.value)}
          />
          <label>Religion</label>
          <input
            type="text"
            value={religion}
            placeholder={User?.religion}
            onChange={(e) => setReligion(e.target.value)}
          />
          <label>Nationality</label>
          <input
            type="text"
            value={Nationality}
            placeholder={User?.nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
          <footer>
            <button className="outline" onClick={handleSubmit}>
              Submit
            </button>
          </footer>
        </article>
      </form>
    </motion.div>
  )
}
