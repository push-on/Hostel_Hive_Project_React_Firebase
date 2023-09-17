import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { db } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function StudentOverview() {
	const { currentUser } = useContext(AuthContext)
	const [User, setUser] = useState<any>()

	useEffect(() => {
		const uid = currentUser?.uid
		if (uid) {
			const documentRef = doc(db, "students", uid)
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
				<p>Student Profile</p>
			</hgroup>

			<article>
				<p><strong>User Name:</strong> {User?.student_name}</p>
				<p><strong>User Email:</strong> {User?.student_email}</p>
				<p><strong>Booked:</strong> {User?.booked ? "Yes" : "No"}</p>
				<p><strong>Hostel Room:</strong> {User?.hostel_room === "" ? "Not Assigned" : User?.hostel_room}</p>
				<p><strong>Hostel Floor:</strong> {User?.hostel_floor === "" ? "Not Assigned" : User?.hostel_floor}</p>
				<p><strong>Created At:</strong> {User?.created_at}</p>
			</article>
		</motion.div>
	)
}
