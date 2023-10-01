import { useEffect, useState } from "react"
import { updateDoc, doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { toast } from "react-hot-toast"

export default function EditUser({ editMode, id, updateData }: any) {
  const [booking, setBooking] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [floor, setFloor] = useState("")
  const [room, setRoom] = useState("")
  const [loading, setLoading] = useState(false)

  const getPreviousData = async () => {
    setLoading(true)
    const docRef = doc(db, "students", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setFullName(docSnap.data().student_name)
      setEmail(docSnap.data().student_email)
      setFloor(docSnap.data().hostel_floor)
      setRoom(docSnap.data().hostel_room)
      setBooking(docSnap.data().booked)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPreviousData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const docRef = doc(db, "students", id)
      await updateDoc(docRef, {
        student_name: fullName,
        student_email: email,
        hostel_floor: floor,
        hostel_room: room,
        booked: booking,
        created_at: new Date()
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
        userID: auth?.currentUser?.uid,
      }).then(() => {
        updateData()
        editMode(false)
        toast.success("Updated Successfully")
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <dialog open>
      <article>
        {loading ? (
          <h2 aria-busy={loading}>loading Edit Data...</h2>
        ) : (
          <h2>Edit User</h2>
        )}
        <form>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <label>Floor number</label>
            <input
              type="number"
              value={floor}
              required
              onChange={(e) => setFloor(e.target.value)}
            />

            <label>Room number</label>
            <input
              type="number"
              value={room}
              required
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <fieldset>
            <legend>Booking</legend>
            <input
              type="radio"
              id="radio-1"
              name="radio"
              checked={booking}
              onChange={() => setBooking(true)}
              value="radio-1"
            />
            <label htmlFor="radio-1">Yes</label>
            <input
              type="radio"
              id="radio-2"
              name="radio"
              checked={!booking}
              onChange={() => setBooking(false)}
              value="radio-2"
            />
            <label htmlFor="radio-2">No</label>
          </fieldset>

          <div className="grid">
            <button className="outline" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="outline secondary"
              onClick={() => editMode(false)}>
              Close
            </button>
          </div>
        </form>
      </article>
    </dialog>
  )
}
