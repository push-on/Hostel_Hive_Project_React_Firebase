import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-hot-toast"
import { auth, db } from "../config/firebase"

export default function CreateUser({ updateData, createMode }: any) {
	const [booking, setBooking] = useState(false)
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [floor, setFloor] = useState('')
	const [room, setRoom] = useState('')

	const myCollectionRef = collection(db, "students")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await addDoc(myCollectionRef, {
			student_name: fullName,
			student_email: email,
			hostel_floor: floor,
			hostel_room: room,
			booked: booking,
			created_at: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
			userID: auth?.currentUser?.uid
		}).then(() => {
			updateData()
			createMode(false)
			toast.success("Added Successfully")
		}).catch(error => {
			toast.error(error.message)
		})

	}

	return (
		<div>
			<dialog open >
				<article>
					<hgroup>
						<h2>CREATE ENTRY</h2>
						<p>Assign Student To Room & Floor</p>
					</hgroup>
					<form >
						<label>Full Name</label>
						<input type="text" required onChange={(e) => setFullName(e.target.value)} />
						<label>Email</label>
						<input type="email" required onChange={(e) => setEmail(e.target.value)} />
						<div >
							<label>Floor number</label>
							<input type="number" required onChange={(e) => setFloor(e.target.value)} />
							<label>Room number</label>
							<input type="number" required onChange={(e) => setRoom(e.target.value)} />
						</div>

						<fieldset>
							<legend>Booking</legend>
							<input type="radio" id="radio-1" name="radio" onChange={() => setBooking(true)} value="radio-1" />
							<label htmlFor="radio-1">Yes</label>
							<input type="radio" id="radio-2" name="radio" onChange={() => setBooking(false)} value="radio-2" />
							<label htmlFor="radio-2">No</label>
						</fieldset>

						<div className="grid">
							<button className="outline" onClick={handleSubmit}>Submit</button>
							<button className="outline secondary" onClick={() => createMode(false)}>Close</button>
						</div>
					</form>
				</article>
			</dialog>
		</div>
	)
}
