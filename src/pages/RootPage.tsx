import { Link } from "react-router-dom"

import HosteImg from "../assets/Hostel.jpg"
import img_one from "../assets/Hostel_Imgs/1.webp"
import img_two from "../assets/Hostel_Imgs/2.webp"
import img_three from "../assets/Hostel_Imgs/3.webp"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Toaster } from "react-hot-toast"


export default function RootPage() {
	const { currentUser, currentRole } = useContext(AuthContext)

	return (
		<div className="container">
			<nav >
				<ul>
					<li><strong>DIU</strong></li>
				</ul>
				<ul>
					<li><Link to="/about">About</Link></li>
					{currentUser !== null && currentRole === "admin"
						?
						(<li><Link to="/dashboard">Dashboard</Link></li>)
						:
						currentUser !== null && currentRole === "student"
							?
							(<li><Link to="/student">Student</Link></li>)
							:
							currentUser !== null && currentRole === "staff"
								?
								(<li><Link to="/staff">Staff</Link></li>)
								:
								(<li><Link to="/login">Login</Link></li>)
					}
				</ul>
			</nav>

			<header>
				<Toaster />
				<hgroup>
					<h2>STUDENT HOSTEL</h2>
					<p>Well decorated hostel with modern facilities</p>
				</hgroup>
				<article className="grid">
					<img src={HosteImg} alt="" />
					<p >
						Dhaka International University offers well decorated
						hostel modern facilities. Foreign students are living
						in the hostels with a comfort. At present there are
						seven boys hostel ( Nikunja, Khilkhet and Satarkul,
						Badda) and one girl's hostels (Satarkul, Badda). In
						the hostels there are prayer rooms, Game
						rooms(lndoor), Common rooms and well decorated
						canteen. All DIU hostels are under CC camera sur-
						veillance. Wi-Fi facilities are available. We have well
						experienced cook and well trained security guards
						to serve the students.
					</p>
				</article>

				<article >
					<img src={img_one} style={{ width: "100%" }} alt="" />
					<footer><small>Image Discription</small></footer>
				</article>
				<article className="grid">
					<img src={img_two} alt="" />
					<img src={img_three} alt="" />
				</article>
			</header>
		</div>
	)
}
