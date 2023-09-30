import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
import generalImage from "../../assets/Hostel_Imgs/img_16.webp"
import singleRoom from "../../assets/Hostel_Imgs/img_7.webp"
import doubleRoom from "../../assets/Hostel_Imgs/img_8.webp"
import sharedRoom from "../../assets/Hostel_Imgs/img_6.webp"
export default function RootRooms() {
	const roomsData = [
		{
			name: "Standard Single Room",
			description: "Perfect for solo students",
			beds: 1,
			acAvailable: true,
			wifi: true,
			foodService: true,
			price: "9,000 BDT per month",
			image: singleRoom,
			additionalInfo: [
				"Private bathroom",
				"Study desk and chair",
				"Wardrobe",
			],
		},
		{
			name: "Double Room",
			description: "Great for friends or roommates",
			beds: 2,
			acAvailable: true,
			wifi: true,
			foodService: true,
			price: "6,000 BDT per month (per person)",
			image: doubleRoom,
			additionalInfo: [
				"Shared bathroom",
				"Two study desks and chairs",
				"Wardrobe for each student",
			],
		},
		{
			name: "Shared Room",
			description: "Budget-friendly option for social students",
			beds: 4,
			acAvailable: false,
			wifi: true,
			foodService: true,
			price: "3,000 BDT per month (per bed)",
			image: sharedRoom,
			additionalInfo: [
				"Shared bathroom",
				"Individual lockers",
				"Common lounge area",
			],
		},

	]

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
								<li><p>Number of Rooms available: </p></li>
							</ul>
							<ul>
								<li>
									<p>Number of Beds: </p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Air Conditioning: </p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Wi-Fi: </p>
								</li>
							</ul>
							<ul>
								<li>
									<p>Food Service: </p>
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
					{roomsData.map((room, index) => (
						<article className="grid" key={index}>
							<article className="center">
								<img src={room.image} alt={`Room ${index + 1}`} />
							</article>
							<article>
								<hgroup>
									<h2>{room.name}</h2>
									<p>{room.description}</p>
								</hgroup>
								<ul>
									<li>Number of Beds: {room.beds}</li>
									<li>Air Conditioning: {room.acAvailable ? "Available" : "Not Available"}</li>
									<li>Wi-Fi: {room.wifi ? "Available" : "Not Available"}</li>
									<li>Food Service: {room.foodService ? "Available" : "Not Available"}</li>
									<li>Price: {room.price}</li>
									<li>Additional Information:</li>
									<ul>
										{room.additionalInfo.map((info, i) => (
											<li key={i}>{info}</li>
										))}
									</ul>
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
