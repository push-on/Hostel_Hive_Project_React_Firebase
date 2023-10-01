import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CountingAnimation } from "../../lib/CounterAnimation"
import { Counter, CounterField } from "../../lib/Counter"

export default function Overview() {

	const [TotalRooms, setTotalRooms] = useState(0)
	const [TotalRoomsActive, setRoomsActive] = useState(0)
	const [TotalStudents, setTotalStudents] = useState(0)
	const [TotalStaff, setTotalStaff] = useState(0)
	const [TotalStudentsBooked, setTotalStudentsBooked] = useState(0)

	useEffect(() => {
		// get number of students
		Counter("students").then(data => {
			setTotalStudents(data)
		})
		CounterField("students", "booked").then(data => {
			setTotalStudentsBooked(data)
		})
		// get number of staffs
		Counter("staffs").then(data => {
			setTotalStaff(data)
		})
		// get number of rooms
		Counter("floor_and_room").then(data => {
			setTotalRooms(data)
		})
		CounterField("floor_and_room", "status").then(data => {
			setRoomsActive(data)
		})

	}, [])

	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}>
			<header>
				<h1>Overview</h1>
			</header>
			<div className="grid">
				<article>
					<h3 className="nowrap overflow">User Information</h3>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Students: 0{<CountingAnimation value={TotalStudents} />} </h4>
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Staff: 0{<CountingAnimation value={TotalStaff} />} </h4>
					</div>
				</article>
				<article>
					<h3 className="nowrap overflow">Room Information</h3>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Rooms: 0{<CountingAnimation value={TotalRooms} />} </h4>
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Payments: 0{<CountingAnimation value={TotalRoomsActive} />} </h4>
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Booked Rooms: 0{<CountingAnimation value={TotalStudentsBooked} />} </h4>
					</div>
				</article>
			</div>
		</motion.div>
	)
}
