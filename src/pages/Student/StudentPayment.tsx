import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { db } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function StudentPayment() {
  const { currentUser, paymentStatus } = useContext(AuthContext)
  const [Payments, setPayments] = useState<any>()

  function getPayments() {
    const uid = currentUser?.uid
    if (uid) {
      const documentRef = doc(db, "payments", uid)
      getDoc(documentRef)
        .then((doc) => {
          setPayments(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    } else {
      toast.error("UID Not Found")
    }
  }
  useEffect(() => {
    getPayments()
  }, [])

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <h1>Current Package</h1>

      <article style={{ textTransform: "capitalize" }}>
        <p>Room Type: {Payments?.room_type} room</p>
        <p>Message: {Payments?.description}</p>
        <p>Amount: {Payments?.price} TK</p>
        <p>Status: {paymentStatus}</p>
      </article>
    </motion.div>
  )
}
