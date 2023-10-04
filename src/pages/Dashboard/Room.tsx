import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { db } from "../../config/firebase"

export default function Rooms() {
  const [roomTypes, setRoomTypes] = useState<any[]>([])
  const [TotalRooms, setTotalRooms] = useState<any[]>([])
  const [modal, setModal] = useState(false)

  const [number, setNumber] = useState<any>()
  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "room_types"))
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setRoomTypes(userData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getRoom = async () => {
    try {
      const data = await getDocs(collection(db, "rooms"))
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setTotalRooms(userData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  async function updateRoomNumber(e: any, id: string) {
    e.preventDefault()
    try {
      const docRef = doc(db, "rooms", id)
      await updateDoc(docRef, {
        number: number,
      }).then(() => {
        toast.success("Updated")
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getData()
    getRoom()
  }, [])

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <article>
        <dialog open={modal}>
          <AddRoomType setModal={setModal} getData={getData} />
        </dialog>
        <nav>
          <ul>
            <li>
              <h1>Room Management</h1>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={() => setModal(true)}>Add Room Type</button>
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
                <td>{room.room_type} room</td>
                <td>{room.bed}</td>
                <td>{room.ac ? "Available" : "Not Available"}</td>
                <td>{room.wifi ? "Available" : "Not Available"}</td>
                <td>{room.foodservice ? "Available" : "Not Available"}</td>
                <td>{room.price}</td>
                <td>{room.bathroom}</td>
                <td>{room.desk}</td>
                <td>{room.wardrobe}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </article>
      <article>
        <h1>Total Rooms</h1>

        {TotalRooms.map((room) => (
          <>
            <h3>Total Rooms: {room.number}</h3>
            <label>Set total room</label>
            <form
              role="group"
              onSubmit={(e) => {
                updateRoomNumber(e, room?.id)
              }}>
              <input
                onChange={(e) => setNumber(e.target.value)}
                type="number"
              />
              <input type="submit" />
            </form>
          </>
        ))}
      </article>
    </motion.div>
  )
}

function AddRoomType({ setModal, getData }: any) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    await addDoc(collection(db, "food_items"), {
      room_type: data.get("name"),
      bed: data.get("beds"),
      ac: data.get("ac"),
      wifi: data.get("wifi"),
      foodservice: data.get("foodService"),
      bathroom: data.get("bathroom"),
      desk: data.get("desk"),
      wardrobe: data.get("wardrobe"),
      price: data.get("price"),
    })
      .then(() => {
        toast.success("Added Successfully")
        getData()
      })
      .catch((error) => {
        toast.error(error.message)
      })

    setModal(false)
  }

  return (
    <article>
      <button className="close contrast " onClick={() => setModal(false)} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input name="name" type="text" required placeholder="Name" />
        <label>Beds</label>
        <input name="beds" type="text" required placeholder="Beds" />
        <label htmlFor="">AC</label>
        <input name="ac" type="text" required placeholder="AC" />
        <label htmlFor="">Wifi</label>
        <input name="wifi" type="text" required placeholder="Wifi" />
        <label htmlFor="">Food Service</label>
        <input
          name="foodService"
          type="text"
          required
          placeholder="Food Service"
        />
        <label> Bathroom</label>
        <input name="bathroom" type="text" required placeholder="Bathroom" />
        <label htmlFor="">Desk</label>
        <input name="desk" type="text" required placeholder="Desk" />
        <label htmlFor="">Wardrobe</label>
        <input name="wardrobe" type="text" required placeholder="Wardrobe" />
        <label htmlFor="">Price</label>
        <input name="price" type="text" required placeholder="Price" />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}
