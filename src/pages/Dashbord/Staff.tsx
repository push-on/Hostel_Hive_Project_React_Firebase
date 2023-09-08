import { useState } from "react"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

// import EditStaff from "../EditStaff" // Import the EditStaff component
// import CreateStaff from "../CreateStaff" // Import the CreateStaff component

// Dummy staff data
const dummyStaffData = [
	{
		id: "1",
		staff_name: "John Doe",
		staff_email: "john.doe@example.com",
		// Add other staff-specific fields here
	},
	{
		id: "2",
		staff_name: "Jane Smith",
		staff_email: "jane.smith@example.com",
		// Add other staff-specific fields here
	},
	{
		id: "3",
		staff_name: "Michael Johnson",
		staff_email: "michael.johnson@example.com",
		// Add other staff-specific fields here
	},
	// Add more staff members here
]

export default function Staff() {
	const [staff, setStaff] = useState(dummyStaffData)
	const [updateID, setUpdateID] = useState("")
	const [EditMode, setEditMode] = useState(false)
	const [CreateMode, setCreateMode] = useState(false)

	console.log(updateID, EditMode, CreateMode)


	const editData = (id: string) => {
		setUpdateID(id)
		setEditMode(true)
	}

	const deleteData = (id: string) => {
		const updatedStaff = staff.filter((staffMember) => staffMember.id !== id)
		setStaff(updatedStaff)
		toast.success("Deleted Successfully")
	}


	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
		>			<nav>
				<ul>
					<li>
						<h1>Staff Details</h1>
					</li>
				</ul>
				<ul>
					<li>
						<button onClick={() => setCreateMode(!CreateMode)}>Create</button>
						{/* {CreateMode ? <CreateStaff /> : ""} */}
					</li>
				</ul>
			</nav>
			<table>
				<thead>
					<tr>
						<th>Staff Name</th>
						<th>Staff Email</th>
						{/* Add other staff-specific fields here */}
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{staff.map((staffMember) => (
						<tr key={staffMember.id}>
							<td>{staffMember.staff_name}</td>
							<td>{staffMember.staff_email}</td>
							{/* Display other staff-specific fields here */}
							<td>
								<button className="btn" onClick={() => editData(staffMember.id)}>
									Edit
								</button>
							</td>
							<td>
								<button className="btn" onClick={() => deleteData(staffMember.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
					{/* {EditMode ? <EditStaff editData={editData} id={updateID} editMode={setEditMode} /> : ""} */}
				</tbody>
			</table>
		</motion.div>
	)
}
