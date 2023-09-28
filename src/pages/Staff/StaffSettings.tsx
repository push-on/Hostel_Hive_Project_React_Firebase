
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export default function StaffSettings() {
	const [User, setUser] = useState<any>()
	const [staffName, setStaffName] = useState("")
	const [address, setAddress] = useState("")
	const [phone, setPhone] = useState("")
	const [role, setRole] = useState("")
	const [salary, setSalary] = useState("")
	const [shift, setShift] = useState("")
	const navigate = useNavigate()

	const getData = () => {
		// Define some dummy data for the staff
		const dummyData = {
			staff_name: 'John Doe',
			address: '123 Main Street',
			phone: '0123456789',
			role: 'Receptionist',
			salary: '1000',
			shift: 'Morning'
		}
		// Set the User state with the dummy data
		setUser(dummyData)
		setStaffName(dummyData.staff_name)
		setAddress(dummyData.address)
		setPhone(dummyData.phone)
		setRole(dummyData.role)
		setSalary(dummyData.salary)
		setShift(dummyData.shift)
	}
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		try {
			toast.success("Updated Successfully")
			navigate("/staff", { replace: true })
		} catch (error: any) {
			toast.error(error.message)
			console.log(error)

		}
	}



	useEffect(() => {
		getData()
	}, [])

	return (
		<motion.div
			initial={{ x: "100vw", opacity: 0 }}
			animate={{ x: "0vw", opacity: 1 }}
			exit={{ x: "-100vw", opacity: 0 }}
			transition={{ ease: "easeInOut", duration: 0.2 }}
		>
			<hgroup>
				<h1>Settings</h1>
				<p>Staff Profile</p>
			</hgroup>

			<form >
				<article>
					<label >Full Name</label>
					<input type="text" value={staffName} placeholder={User?.staff_name} onChange={(e) => setStaffName(e.target.value)} />
					<label >Address</label>
					<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
					<label >Phone</label>
					<input type="text" value={phone} placeholder={User?.phone} onChange={(e) => setPhone(e.target.value)} />
					<label>Role</label>
					<input type="text" value={role} placeholder={User?.role} onChange={(e) => setRole(e.target.value)} />
					<label>Salary</label>
					<input type="text" value={salary} placeholder={User?.salary} onChange={(e) => setSalary(e.target.value)} />
					<label>Shift</label>
					<input type="text" value={shift} placeholder={User?.shift} onChange={(e) => setShift(e.target.value)} />
					<footer>
						<button className="outline" onClick={handleSubmit}>Submit</button>
					</footer>
				</article>
			</form>
		</motion.div>
	)
}
