import { useState } from "react"
import { toast } from "react-hot-toast"

export default function StudentFloor() {
	const [rooms] = useState([
		{
			id: 1,
			roomNo: 101, 
			bedNo: 2, 
			floor: 1, 
			status: "active", 
			ac: true, 
			price: 100,
			isBooked: false,
		},
		{
			id: 2,
			roomNo: 102, 
			bedNo: 3, 
			floor: 2, 
			status: "inactive", 
			ac: false, 
			price: 120,
			isBooked: false,
		},
		{
			id: 3,
			roomNo: 103, 
			bedNo: 1, 
			floor: 3, 
			status: "active", 
			ac: true, 
			price: 80,
			isBooked: true, 
		},
		
	])

	const [selectedRoom, setSelectedRoom] = useState<any>(null)
	const [bookingSuccess, setBookingSuccess] = useState<any>(false)
	const [error, setError] = useState <any>(null)

	
	const handleRoomBooking = () => {
		if (selectedRoom) {
			setBookingSuccess(true)
			toast.success("Room Booked")
		} else {
			setError("Please select a room to book")
		}
	}

	return (
		<div>
			<nav>
				<ul>
					<hgroup>
						<h2>Room Booking</h2>
						{error && <p>Error: {error}</p>}
						{bookingSuccess && <p>Booking Successful!</p>}
					</hgroup>

				</ul>


				{selectedRoom && (
					<ul>
						<li>
							Selected Room: {selectedRoom}
						</li>
						<li>
							<button onClick={handleRoomBooking}>Confirm Booking</button>
						</li>
					</ul>
				)}
			</nav>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Room No</th>
						<th>Bed No</th>
						<th>Floor</th>
						<th>Status</th>
						<th>AC</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Allotment</th>
					</tr>
				</thead>
				<tbody>
					{rooms.map((room) => (
						<tr key={room.id}>
							<td>{room.id}</td>
							<td>{room.roomNo}</td> 
							<td>{room.bedNo}</td>
							<td>{room.floor}</td>
							<td>{room.status}</td>
							<td>{room.ac ? "Yes" : "No"}</td>
							<td>{room.price} tk</td>
							<td>{room.isBooked ? "Not Available" : "Available"}</td>
							<td>
								{room.isBooked ? (
									<span>Not Available</span>
								) : (
										<input
											type="radio"
											name="roomSelection"
											value={room.id}
											checked={selectedRoom === room.id}
											onChange={() => setSelectedRoom(room.id)}
										/>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	)
}
