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
			transition={{ ease: "easeInOut", duration: 0.2 }}
		>
			<hgroup>
				<h1>Profile</h1>
				<p>Staff Profile</p>
			</hgroup>

			<article>
				<p><strong>User Name:</strong> {User?.staff_name}</p>
				<p><strong>User Email:</strong> {User?.staff_email}</p>
				<p><strong>Created At:</strong> {User?.created_at}</p>
			</article>
		</motion.div>
	)
}
