import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
import generalImage from "../../assets/Hostel_Imgs/img_16.webp"
import singleRoom from "../../assets/Hostel_Imgs/img_7.webp"
import doubleRoom from "../../assets/Hostel_Imgs/img_8.webp"
import sharedRoom from "../../assets/Hostel_Imgs/img_6.webp"
import { useContext, useEffect, useState } from "react"
import { Counter, CounterField } from "../../lib/Counter"
import { db } from "../../config/firebase"
import { getDocs, collection } from "firebase/firestore"
import toast, { Toaster } from "react-hot-toast"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import PaymentModal from "../../components/PaymentModal"

export default function RootRooms() {
  const [roomTypes, setRoomTypes] = useState<any[]>([])
  const navigate = useNavigate()
  const [TotalRooms, setTotalRooms] = useState(0)
  const [TotalRoomsActive, setRoomsActive] = useState(0)
  const { currentUser, paymentStatus } = useContext(AuthContext)
  const [modal, setModal] = useState(false)
  const [roomID, setRoomID] = useState("")
  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "room_types"))
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setRoomTypes(userData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleRoomBook = (id: string) => {
    if (currentUser === null) {
      navigate("/login", { state: { from: "/rooms" } })
      return
    }
    if (paymentStatus === null || paymentStatus === false) {
      setRoomID(id)
      setModal(true)
    }
  }

  useEffect(() => {
    // get number of rooms
    Counter("floor_and_room").then((data) => {
      setTotalRooms(data)
    })
    CounterField("floor_and_room", "status").then((data) => {
      setRoomsActive(data)
    })
    getData()
  }, [])

  return (
    <div className="container">
      {modal && <PaymentModal setModal={setModal} id={roomID} />}
      <NavBar />
      <Toaster />
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <article>
          <header>
            <hgroup style={{ textAlign: "center" }}>
              <h1>ROOMS</h1>
              <p>Rooms & Service of Hostel Hive</p>
            </hgroup>
          </header>
          <article className="grid">
            <article>
              <hgroup>
                <h1>General Information</h1>
                <p>An Overview of Available Rooms and Beds</p>
              </hgroup>
              <ul>
                <li>
                  <p>Total Number of Rooms: 0{TotalRooms} </p>
                </li>
                <li>
                  <p>Total Number of Rooms Available: 0{TotalRoomsActive}</p>
                </li>
                <li>
                  <p>Number of Beds Available: </p>
                </li>
                <li>
                  <p>Air Conditioning: Available</p>
                </li>
                <li>
                  <p>Wi-Fi: Available</p>
                </li>
                <li>
                  <p>Food Service: Available</p>
                </li>
                <li>
                  <p>Access to shared spaces.</p>
                </li>
                <li>
                  <p>Access to Common Place.</p>
                </li>
              </ul>
            </article>
            <article>
              <img src={generalImage} alt="" />
            </article>
          </article>
          {roomTypes.map((room, index) => (
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
              className="grid"
              key={index}>
              <article className="center">
                <img
                  src={
                    room.room_type === "single"
                      ? singleRoom
                      : room.room_type === "double"
                      ? doubleRoom
                      : room.room_type === "shared"
                      ? sharedRoom
                      : ""
                  }
                  alt={`Room ${index + 1}`}
                />
              </article>
              <article>
                <hgroup>
                  <h2 style={{ textTransform: "capitalize" }}>
                    {room.room_type} Room
                  </h2>
                  <p>{room.description}</p>
                </hgroup>
                <ul>
                  <li>Number of Beds: {room.bed}</li>
                  <li>
                    Air Conditioning: {room.ac ? "Available" : "Not Available"}
                  </li>
                  <li>Wi-Fi: {room.wifi ? "Available" : "Not Available"}</li>
                  <li>
                    Food Service:{" "}
                    {room.foodservice ? "Available" : "Not Available"}
                  </li>
                  <li>Price: {room.price}</li>
                  <li>bathroom: {room.bathroom}</li>
                  <li>Study desk: {room.desk}</li>
                  <li>Wardrobe: {room.wardrobe}</li>
                </ul>
                <footer>
                  <nav>
                    <ul></ul>
                    <ul>
                      <button onClick={() => handleRoomBook(room.id)}>
                        BOOK
                      </button>
                    </ul>
                  </nav>
                </footer>
              </article>
            </motion.article>
          ))}
        </article>
      </motion.div>
      <Footer />
    </div>
  )
}
