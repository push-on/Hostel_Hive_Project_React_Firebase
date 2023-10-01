import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { db } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function StaffOverview() {
  const { currentUser } = useContext(AuthContext)
  const [User, setUser] = useState<any>()

  useEffect(() => {
    const uid = currentUser?.uid
    if (uid) {
      const documentRef = doc(db, "staffs", uid)
      getDoc(documentRef)
        .then((doc) => {
          setUser(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    } else {
      toast.error("UID Not Found")
    }
  }, [])

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <hgroup>
        <h1>Profile</h1>
        <p>Staff Profile</p>
      </hgroup>

      <article>
        <p>
          <strong>User Name:</strong> {User?.staff_name}
        </p>
        <p>
          <strong>User Email:</strong> {User?.staff_email}
        </p>
        <p>
          <strong>Created At:</strong> {User?.created_at}
        </p>
        <p>
          <strong>Address:</strong> {User?.address} 123 Main Street
        </p>
        <p>
          <strong>Phone:</strong> {User?.phone} 0123456789
        </p>
        <p>
          <strong>Role:</strong> {User?.role} Receptionist
        </p>
        <p>
          <strong>Salary:</strong> {User?.salary} 1000
        </p>
        <p>
          <strong>Shift:</strong> {User?.shift} Morning
        </p>
      </article>
    </motion.div>
  )
}
