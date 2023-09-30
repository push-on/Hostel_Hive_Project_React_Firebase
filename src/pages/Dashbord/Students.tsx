import { useState, useEffect, useContext } from "react"
import { db } from "../../config/firebase"

import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"


import EditUser from "./EditUser"
import { AuthContext } from "../../context/AuthContext"

interface Student {
	id: string
}


export default function Students() {
	const [students, setStudents] = useState<Student[]>([])
	const [updateID, setUpdateID] = useState('')
	const [EditMode, setEditMode] = useState(false)
	const { currentUser } = useContext(AuthContext)

	const myCollectionRef = collection(db, "students")

	const editData = async (id: string) => {
		if (currentUser) {
			setUpdateID(id)
			setEditMode(true)
		} else {
			toast.error("you are not logged in")
		}
	}

	const getData = async () => {
		try {
			const data = await getDocs(myCollectionRef)
			const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			setStudents(userData)
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const deleteData = async (id: string) => {
		try {
			const docRef = doc(db, "students", id)
			await deleteDoc(docRef).then(() => {
				getData()
				toast.success("Deleted Successfully")
			})
		} catch (error) {
			toast.error("you are not logged in")
		}
	}

	useEffect(() => {
		getData()
	}, [])


	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
		>
			<nav>
				<ul><li><h1>Student Details</h1></li></ul>
			</nav>
			<table>
				<thead>
					<tr>
						<th className='nowrap'>Student Name</th>
						<th className='nowrap'>Student Email</th>
						<th className='nowrap'>Hostel FLoor</th>
						<th className='nowrap'>Hostel Room</th>
						<th className='nowrap'>Booked</th>
						<th className='nowrap'>Update</th>
						<th className='nowrap'>Delete</th>
					</tr>
				</thead>
				<tbody>
					{students?.map((student: any) => (
						<tr key={student?.id}>
							<td>{student?.student_name}</td>
							<td>{student?.student_email}</td>
							<td>{student?.hostel_floor === "" ? "Not Assigned" : student?.hostel_floor}</td>
							<td>{student?.hostel_room === "" ? "Not Assigned" : student?.hostel_room}</td>
							<td>{student?.booked ? "Yes" : "No"}</td>
							<td><button className="btn" onClick={() => editData(student.id)}>edit</button></td>
							<td><button className="btn" onClick={() => deleteData(student.id)}>delete</button></td>
						</tr>
					))}
					{EditMode ? <EditUser editData={editData} id={updateID} editMode={setEditMode} updateData={getData} /> : ""}
				</tbody>
			</table>
		</motion.div>
	)
}
