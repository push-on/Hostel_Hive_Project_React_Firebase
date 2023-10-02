import { collection, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { db } from "../../config/firebase"

export default function Rooms() {
  const [roomTypes, setRoomTypes] = useState<any[]>([])

  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "room_types"))
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setRoomTypes(userData)
    } catch (error: any) {
      toast.error(error.message)
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
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <article>
        <h1>Room Management</h1>
        <nav>
          <ul></ul>
          <ul>
            <li>
              <button>Create Room Types</button>
            </li>
          </ul>
        </nav>
        <h2>Types Of Rooms</h2>
        <table>
          <thead>
            <tr style={{ textTransform: "capitalize" }}>
              <th>name</th>
              <th>beds</th>
              <th>ac</th>
              <th>wifi</th>
              <th>Food Service</th>
              <th>price</th>
              <th>image</th>
              <th>Bathroom</th>
              <th>Desk</th>
              <th>Wardrobe</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((room) => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}>
                <td>{room.room_type}</td>
                <td>{room.bed}</td>
                <td>{room.ac ? "Available" : "Not Available"}</td>
                <td>{room.wifi ? "Available" : "Not Available"}</td>
                <td>{room.foodservice ? "Available" : "Not Available"}</td>
                <td>{room.price}</td>
                <td>{room.image}</td>
                <td>{room.bathroom}</td>
                <td>{room.desk}</td>
                <td>{room.wardrobe}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </article>
      <article>
        <h2>Availability</h2>
        <nav>
          <ul></ul>
          <ul>
            <li>
              <button>Add Rooms</button>
            </li>
          </ul>
        </nav>
        <table>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Floor No</th>
              <th>Room No</th>
              <th>Bed Available</th>
              <th>Status</th>
              <th>Assign</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Shared</td>
              <td>02</td>
              <td>201</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <button className="btn">Assign</button>
              </td>
              <td>
                <button className="btn">Remove</button>
              </td>
            </tr>
            <tr>
              <td>Shared</td>
              <td>02</td>
              <td>201</td>
              <td>2</td>
              <td>Active</td>
              <td>
                <button className="btn">Assign</button>
              </td>
              <td>
                <button className="btn">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </motion.div>
  )
}
