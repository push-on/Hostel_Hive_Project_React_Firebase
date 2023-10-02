import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { motion } from "framer-motion"



export default function CurrentUser() {
	const { currentUser, currentRole, paymentStatus } = useContext(AuthContext)

	return (
    <>
      <motion.nav
        style={{ textTransform: "uppercase" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <ul>
          <li className="nowrap">
            <strong>User: </strong>{" "}
            <span style={{ color: "silver" }}>
              {currentUser === null ? "User Not Logged in" : currentUser?.email}
            </span>
          </li>
          <li className="nowrap">
            <strong>Role: </strong>
            <span style={{ color: "silver" }}>
              {currentRole === null ? "Public" : currentRole}
            </span>
          </li>
          <li className="nowrap">
            <strong>PaymentStatus: </strong>
            <span style={{ color: "silver" }}>
              {paymentStatus === null ? "unavailable" : paymentStatus ? "paid" : "unpaid"}
            </span>
          </li>
        </ul>
      </motion.nav>
    </>
  )
}
