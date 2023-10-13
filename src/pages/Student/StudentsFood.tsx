import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function StudentsFood() {
  const { currentUser } = useContext(AuthContext)
  const [status, setStatus] = useState<any>()
  const navigate = useNavigate()

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
      <nav>
        <ul>
          <li>
            <h3>Students Daily Meal Plan</h3>
          </li>
        </ul>
        <ul>
          <li>
            <button
              onClick={() => {
                navigate("/foods")
              }}>
              Check Meal Plan
            </button>
          </li>
        </ul>
      </nav>
      <h3>Current Food Package</h3>

      <article style={{ textTransform: "capitalize" }}>
        <p>
          <strong>Selected Meal:</strong> {status?.meal}
        </p>
        <p>
          <strong>Message:</strong> {status?.description}
        </p>
        <p>
          <strong>Payment Status:</strong> {status?.paymentStatus}
        </p>
        <p>
          <strong>Subscribed:</strong> {status?.time}
        </p>
      </article>
    </motion.div>
  )
}
