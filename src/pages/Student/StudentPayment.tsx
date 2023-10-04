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
        <p>
          <strong>Room Type:</strong> {Payments?.room_type} room
        </p>
        <p>
          <strong>Message:</strong> {Payments?.description}
        </p>
        <p>
          <strong>Amount:</strong> {Payments?.price} TK
        </p>
        <p>
          <strong>Status:</strong> {paymentStatus}
        </p>
        <p>
          <strong>Days Left: </strong>
          {Payments?.validity &&
            `${Math.ceil(
              (new Date(Payments.validity).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )} days`}
        </p>
        <p>
          <strong>Valid till:</strong> {Payments?.validity}
        </p>
      </article>
    </motion.div>
  )
}
