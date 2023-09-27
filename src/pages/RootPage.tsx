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
	console.log(currentRole)

	return (
		<div className="container">
			<nav >
				<ul>
					<li><strong>DIU</strong></li>
					<li><strong>User:</strong></li>
					<li><strong>{currentUser === null ? "User Not Logged in" : currentUser?.email}</strong></li>
					<li><strong className='nowrap'>Role: {currentRole === null ? "Public" : currentRole}</strong></li>
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
					<h3>A Cozy and Creative Study Space </h3>
					<img src={img_one} style={{ width: "100%" }} alt="" />
					<small> Our hostel offers a comfortable and stimulating environment for our students to pursue their academic goals. Our study room is equipped with a large table, plenty of books, papers, and coffee cups, and a window with a view of nature. Our students can enjoy reading, writing, drawing, or collaborating with their peers in this bright and spacious room. The study room is open 24/7 and has free Wi-Fi access. Whether you need a quiet place to focus or a lively place to exchange ideas, our study room is the perfect choice for you.</small>
				</article>
				<article className="grid">
					<div>
						<h3>A Private Modern & Productive  Workstation </h3>
						<img src={img_two} alt="" />
						<small>
							<p>Our hostel provides a state-of-the-art workstation for our students to work on their projects, assignments, or online classes. Our workstation has a wooden desk, a computer monitor, a keyboard, a mouse, and other office supplies. Our students can write in their notebooks, use the computer, or join a video call with their instructors or classmates. Our workstation is cozy and inviting, with a plant, a coffee cup, and a window with natural light. The workstation is available for booking anytime and has high-speed internet connection. Whether you need a professional place to work or a comfortable place to learn, our workstation is the ideal option for you.</p>
						</small>
					</div>
					<div>
						<h3>A Fun & Friendly Library </h3>
						<img src={img_three} alt="" />
						<small>
							<p>Our hostel has a spacious and well-stocked library for our students to access a variety of books, magazines, and journals. Our library is a great place to study, research, or relax with a good read. Our students can also use their laptops to connect to the internet or work on their assignments. Our library is lively and social, with a group of students who are always ready to help each other out, share their insights, or celebrate their achievements. The library is open from 8 am to 10 pm and has a friendly staff who can assist you with any queries. Whether you need a serious place to learn or a fun place to hang out, our library is the best choice for you.</p>
						</small>
					</div>
				</article>
			</header>
		</div >
	)
}
