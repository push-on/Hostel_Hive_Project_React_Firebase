import { motion } from "framer-motion"

import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Settings() {
  const { currentUser } = useContext(AuthContext)

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <hgroup>
        <h1>Settings</h1>
        <p>Admin Settings</p>
      </hgroup>

      <article>
        <p>
          <strong>User Name:</strong> Admin User
        </p>
        <p>
          <strong>User Email:</strong> {currentUser?.email}
        </p>
        <p>
          <strong>User ID:</strong> {currentUser?.uid}
        </p>
      </article>
    </motion.div>
  )
}
