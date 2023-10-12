import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

export default function StudentsFood() {
  const { currentUser } = useContext(AuthContext)
  const [status, setStatus] = useState<any>()

  const getFoodSubscription = async () => {
    const uid = currentUser?.uid
    if (uid) {
      getDoc(doc(db, "food_subscriptions", uid))
        .then((doc) => {
          setStatus(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    }
  }
  useEffect(() => {
    getFoodSubscription()
  }, [])
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <h1>Current Food Package</h1>

      <article style={{ textTransform: "capitalize" }}>
        <p>
          <strong>Selected Subscription:</strong> {status?.selected}{" "}
        </p>
        <p>
          <strong>Message:</strong> {status?.description}
        </p>
        <p>
          <strong>Amount:</strong> {status?.price}
        </p>
        <p>
          <strong>Payment Status:</strong> {status?.payment}
        </p>
        <p>
          <strong>Subscribed:</strong> {status?.date}
        </p>
      </article>
    </motion.div>
  )
}
