import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"

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
			image: "https://picsum.photos/500",
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
			image: "https://picsum.photos/500",
			additionalInfo: [
				"Shared bathroom",
				"Two study desks and chairs",
				"Wardrobe for each student",
			],
		},
		{
			name: "Shared Dormitory",
			description: "Budget-friendly option for social students",
			beds: 4,
			acAvailable: false,
			wifi: true,
			foodService: true,
			price: "3,000 BDT per month (per bed)", 
			image: "https://picsum.photos/500",
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
						<h1 style={{ textAlign: "center" }}>STUDENT HOSTEL ROOMS</h1>
					</header>
					<article className="grid">
						<article>
							<h2>General Information</h2>
							<p>Number of Rooms available: {roomsData.length}</p>
							<p>Number of Beds: {roomsData.reduce((total, room) => total + room.beds, 0)}</p>
							<p>Air Conditioning: {roomsData.some((room) => room.acAvailable) ? "Available" : "Not Available"}</p>
							<p>Wi-Fi: {roomsData.every((room) => room.wifi) ? "Available in all rooms" : "Available in common areas"}</p>
							<p>Food Service: {roomsData.some((room) => room.foodService) ? "Available" : "Not Available"}</p>
						</article>
						<article>
							<img src="https://picsum.photos/500" alt="" />
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
