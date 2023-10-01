import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
import generalImage from "../../assets/Hostel_Imgs/img_16.webp"
import singleRoom from "../../assets/Hostel_Imgs/img_7.webp"
import doubleRoom from "../../assets/Hostel_Imgs/img_8.webp"
import sharedRoom from "../../assets/Hostel_Imgs/img_6.webp"
import { useEffect, useState } from "react"
import { Counter, CounterField } from "../../lib/Counter"
import { db, storage } from "../../config/firebase"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import toast from "react-hot-toast"
import { getDownloadURL, ref } from "firebase/storage"

export default function RootRooms() {
	const [roomTypes, setRoomTypes] = useState<any[]>([])
	const [imgUrl, setImgUrl] = useState<any>("")
	const getData = async () => {
		try {
			const data = await getDocs(collection(db, "room_types"))
			const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			setRoomTypes(userData)
		} catch (error: any) {
			toast.error(error.message)
		}
	}
	const [TotalRooms, setTotalRooms] = useState(0)
	const [TotalRoomsActive, setRoomsActive] = useState(0)

	getDownloadURL(ref(storage, "double_room.webp")).then((url) => {
		setImgUrl(url)
	})

	useEffect(() => {
		// get number of rooms
		Counter("floor_and_room").then(data => {
			setTotalRooms(data)
		})
		CounterField("floor_and_room", "status").then(data => {
			setRoomsActive(data)
		})
		getData()
	}, [])
	return (
		<div className="container">
			<NavBar />
			<motion.div
				initial={{ x: "100vw", opacity: 0 }}
				animate={{ x: "0vw", opacity: 1 }}
				exit={{ x: "-100vw", opacity: 0 }}
				transition={{ ease: "easeInOut", duration: 0.2 }}
			>
				<article>
					<header>
						<hgroup style={{ textAlign: "center" }}>

							<h1 >ROOMS</h1>
							<p>Rooms & Service of Hostel Hive</p>
						</hgroup>
					</header>
					<article className="grid">
						<article>
							<hgroup >
								<h1>General Information</h1>
								<p>An Overview of Available Rooms and Beds</p>
							</hgroup>
							<ul>
								<li><p>Total Number of Rooms: 0{TotalRooms} </p></li>
							</ul>
							<ul>
								<li>
									<p>Total Number of Rooms Available: 0{TotalRoomsActive}</p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Number of Beds Available: </p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Air Conditioning: Available</p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Wi-Fi: Available</p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Food Service: Available</p>
								</li>
							</ul>
							<ul>
								<li><p>Access to shared spaces.</p></li>
							</ul>
							<ul>
								<li><p>Access to Common Place.</p></li>
							</ul>
						</article>
						<article>
							<img src={generalImage} alt="" />
						</article>
					</article>
					{roomTypes.map((room, index) => (
						<article className="grid" key={index}>
							<article className="center">
								<img src={imgUrl} alt={`Room ${index + 1}`} />
							</article>
							<article>
								<hgroup>
									<h2>{room.room_type}</h2>
									<p>{room.description}</p>
								</hgroup>
								<ul>
									<li>Number of Beds: {room.beds}</li>
									<li>Air Conditioning: {room.acAvailable ? "Available" : "Not Available"}</li>
									<li>Wi-Fi: {room.wifi ? "Available" : "Not Available"}</li>
									<li>Food Service: {room.foodService ? "Available" : "Not Available"}</li>
									<li>Price: {room.price}</li>
									<li>Private bathroom</li>
									<li>Study desk and chair</li>
									<li>Wardrobe</li>
								</ul>
								<footer>
									<nav>
										<ul></ul>
										<ul>
											<button>BOOK</button>
										</ul>
									</nav>
								</footer>
							</article>
						</article>
					))}
				</article>
			</motion.div>
			<Footer />
		</div>
	)
}
