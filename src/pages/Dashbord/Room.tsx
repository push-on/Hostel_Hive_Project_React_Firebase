import { useState } from "react"
import { motion } from "framer-motion"

const dummyFloorData = [
	{
		id: "1",
		floor_name: "1st Floor",
		num_rooms: 10,
		description: "Standard rooms",
	},
	{
		id: "2",
		floor_name: "2nd Floor",
		num_rooms: 8,
		description: "Deluxe rooms",
	},
	// Add more floor data here
]

// Dummy room data
const dummyRoomData = [
	{
		id: "1",
		room_name: "101",
		floor_id: "1",
		status: "active",
		ac_available: true,
		price: "৳1000",
		is_booked: false,
	},
	{
		id: "2",
		room_name: "102",
		floor_id: "1",
		status: "active",
		ac_available: false,
		price: "৳800",
		is_booked: false,
	},
	// Add more room data here
]

export default function Rooms() {
	const [floors, setFloors] = useState(dummyFloorData)
	const [rooms, setRooms] = useState(dummyRoomData)
	// const [updateRoomID, setUpdateRoomID] = useState("")
	// const [editRoomMode, setEditRoomMode] = useState(false)
	const [createRoomMode, setCreateRoomMode] = useState(false)


	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
		>			<nav>
				<ul>
					<li>
						<h1>Room Management</h1>
					</li>
				</ul>
				<ul>
					<li>
						<button onClick={() => {
							setCreateRoomMode(!createRoomMode)
							setFloors(dummyFloorData)
							setRooms(dummyRoomData)
						}
							

						}>Create Room</button>

					</li>
				</ul>
			</nav>
			<h2>Floors</h2>
			<table>
				<thead>
					<tr>
						<th>Floor Name</th>
						<th>Number of Rooms</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{floors.map((floor) => (
						<tr key={floor.id}>
							<td>{floor.floor_name}</td>
							<td>{floor.num_rooms}</td>
							<td>{floor.description}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>Rooms</h2>
			<table>
				<thead>
					<tr>
						<th>Room Name/Number</th>
						<th>Floor</th>
						<th>Status</th>
						<th>AC Available</th>
						<th>Price (৳)</th>
						<th>Is Booked</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{rooms.map((room) => (
						<tr key={room.id}>
							<td>{room.room_name}</td>
							<td>{/* Display floor name here */}</td>
							<td>{room.status}</td>
							<td>{room.ac_available ? "Yes" : "No"}</td>
							<td>{room.price}</td>
							<td>{room.is_booked ? "Yes" : "No"}</td>
							<td>
								<button className="btn" >
									Edit
								</button>
							</td>
							<td>
								<button className="btn" >
									Delete
								</button>
							</td>
						</tr>
					))}

				</tbody>
			</table>
		</motion.div>
	)
}
