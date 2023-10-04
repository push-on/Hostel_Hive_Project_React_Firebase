import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { db } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function StudentOverview() {
  const { currentUser } = useContext(AuthContext)
  const [User, setUser] = useState<any>()

  function getUsers() {
    const uid = currentUser?.uid
    if (uid) {
      getDoc(doc(db, "students", uid))
        .then((doc) => {
          setUser(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    } else {
      toast.error("UID Not Found")
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <hgroup>
        <h1>Profile </h1>
        <p>Student Profile</p>
      </hgroup>

      <article>
        <h1>User Details</h1>
        <p style={{ textTransform: "capitalize" }}>
          <strong>User Name: </strong> {User?.student_name}
        </p>
        <p>
          <strong>User Email: </strong> {User?.student_email}
        </p>

        <p>
          <strong>Phone Number: </strong> {User?.phone}
        </p>
        <p>
          <strong>Created At:</strong> {User?.created_at}
        </p>
        {/* <p>
          <strong>Hostel Room: </strong>
          {User?.hostel_room === "" ? "Not Assigned" : User?.hostel_room}
        </p>
        <p>
          <strong>Hostel Floor: </strong>
          {User?.hostel_floor === "" ? "Not Assigned" : User?.hostel_floor}
        </p> */}
        <p>
          <strong>Address: </strong>
          {User?.address === "" ? "Not Assigned" : User?.address}
        </p>
        <p>
          <strong>Guardian Name: </strong>
          {User?.guardian_name === "" ? "Not Assigned" : User?.guardian_name}
        </p>
        <p>
          <strong>Guardian Number: </strong>
          {User?.emergency_num === "" ? "Not Assigned" : User?.emergency_num}
        </p>
        <p>
          <strong>Gender: </strong>
          {User?.gender === "" ? "Not Assigned" : User?.gender}
        </p>
        <p>
          <strong>Religion: </strong>
          {User?.religion === "" ? "Not Assigned" : User?.religion}
        </p>
        <p>
          <strong>Nationality: </strong>
          {User?.nationality === "" ? "Not Assigned" : User?.nationality}
        </p>
      </article>
    </motion.div>
  )
}
