import { Link } from "react-router-dom"
import Profile_Image from "../assets/Profile_pics/profile.webp"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"

export default function About() {
	const { currentUser , currentRole } = useContext(AuthContext)

	return (
		<div className="container">
			<nav style={{ textTransform: "uppercase" }}>
				<ul>
					<li style={{ fontSize: "30px" }}><strong><Link to="/">DIU</Link></strong></li>
					<li style={{ color: "greenyellow" }}>User: {currentUser === null ? "User Not Logged in" : currentUser?.email}</li>
					<li className="nowrap" style={{ color: "greenyellow" }}>Role: {currentRole === null ? "Public" : currentRole}</li>
				</ul>
				<ul>
					<li><Link to="/">Home</Link></li>
					{currentUser !== null && currentRole === "admin"
						?
						(<li><Link to="/dashboard">Admin Dashboard</Link></li>)
						:
						currentUser !== null && currentRole === "student"
							?
							(<li><Link to="/student">Student Dashboard</Link></li>)
							:
							currentUser !== null && currentRole === "staff"
								?
								(<li><Link to="/staff">Staff Dashboard</Link></li>)
								:
								(<li><Link to="/login">Login / SignUp</Link></li>)
					}
				</ul>
			</nav>

			<article>
				<header>
					<hgroup>
						<h1>About Us</h1>
						<p>Integrated Student Hostel Solutions Empowering Institutions</p>
					</hgroup>
					<main>
						<p>
							Dhaka International University offers well-decorated
							hostels with modern facilities. Foreign students are living
							in the hostels with comfort. At present, there are
							seven boys hostels (Nikunja, Khilkhet, and Satarkul,
							Badda) and one girl's hostel (Satarkul, Badda). In
							the hostels, there are prayer rooms, game
							rooms (indoor), common rooms, and a well-decorated
							canteen. All DIU hostels are under CC camera sur-
							veillance. Wi-Fi facilities are available. We have well-
							experienced cooks and well-trained security guards
							to serve the students.
						</p>
					</main>
				</header>
				<footer>
					<div className="grid">
						<h3>Students Booked: 10k+</h3>
						<h3>Active Hostels: 3</h3>
						<h3>Staff Members: 300+</h3>
					</div>
				</footer>
			</article>
			<article>
				<header>
					<main className="grid">
						<img src={Profile_Image} width={400} style={{ marginLeft: "auto", marginRight: "auto" }} alt="" />
						<div>
							<h1>Founder Name</h1>
							<p><strong>Founder & Managing Director</strong></p>
							<p>
								"name" founded Hostel Hive in 2010 as a leading provider of technology-based hostel management solutions. With 15+ years in education and hospitality, he identified the need to automate and ease hostel operations. "name" developed innovative software that transformed management through paperless admin, cashless transactions, remote access, and parent connectivity.
							</p>
							<p>
								As CEO of Hostel Hive, "name" oversees partnerships with 200+ institutes to manage hostels for 50,000+ students. His expert team developed an integrated hostel management system that digitizes processes like fee collection, attendance, visitor logs, and access control. "name"'s passion for leveraging technology to benefit hostels and students has driven widespread adoption of Hostel Hive's solutions in Bangladesh.
							</p>
						</div>
					</main>
				</header>
				<footer>
					<hgroup>
						<h1>Our Team</h1>
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia necessitatibus pariatur doloribus ab quis aliquid ipsa, fugiat temporibus illo magni quas perspiciatis porro iste fugit minima voluptas debitis tempora nobis.</p>
					</hgroup>
					<div className="grid">
						<hgroup>
							<h3>Team Leader</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione commodi, laborum est fuga, nulla aliquam vero neque tempore nostrum non omnis natus porro adipisci obcaecati, numquam reprehenderit dignissimos. Recusandae, beatae!</p>
						</hgroup>
						<hgroup>
							<h3>Assistant Manager</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, unde aliquid magni omnis consequuntur dolor repellendus saepe fugiat corrupti! Id, dignissimos qui tempora praesentium autem cumque velit facere odio nostrum.</p>
						</hgroup>
						<hgroup>
							<h3>Staff Manager</h3>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, soluta! Eaque enim odio, quibusdam cum labore expedita non fuga nihil impedit voluptate quae eveniet tempora in dolorum beatae repellat delectus.</p>
						</hgroup>
					</div>
				</footer>
			</article>
			<article>
				<header>
					<hgroup>
						<h1>History Timeline</h1>
						<p>The Legacy of Hostel Hive</p>
					</hgroup>
					<main>
						<div className="grid">
							<div>
								<strong>2010</strong>
								<p>Hostel Hive was founded by "name" to provide technology-driven hostel management solutions for educational institutes in Bangladesh.</p>
							</div>
							<div>
								<strong>2015</strong>
								<p>Hostel Hive had partnered with over 100 institutes to manage hostels for thousands of students across Bangladesh. The company shifted to cloud technology to improve accessibility.</p>
							</div>
							<div>
								<strong>2022</strong>
								<p>Hostel Hive expanded to over 200 institute partnerships and 50,000 students by leveraging the latest technologies for the education sector.</p>
							</div>
							<div>
								<strong>Today</strong>
								<p>Under "name"'s leadership, Hostel Hive continues to transform hostel living and management using tailored solutions. The company aims to further modernize hostel operations for the education sector in Bangladesh.</p>
							</div>
						</div>
					</main>
				</header>
			</article>
			<article>

				<footer >
					<div className="grid">
						<div>
							<h4>STUDENT HOSTEL</h4>
							<p>A place to live, learn, and grow</p>
							<ul>
								<li><a href="/">About us</a></li>
								<li><a href="/">Contact us</a></li>
								<li><a href="/">Privacy policy</a></li>
							</ul>
						</div>
						<div>
							<h4>FOLLOW US</h4>
							<p>Stay connected with us on social media</p>
							<ul className="social-icons">
								<li><BsFacebook /> <a href="https://www.facebook.com/diu.net.bd/">Facebook</a></li>
								<li><BsTwitter /> <a href="https://twitter.com/diubd">Twitter</a></li>
								<li><BsInstagram /> <a href="https://www.instagram.com/diu.net.bd/">Instagram</a></li>
							</ul>
						</div>
						<div>
							<h4>SUBSCRIBE</h4>
							<p>Get the latest news and updates from our hostel</p>
							<form action="#" method="post">
								<input type="email" name="email" placeholder="Enter your email" />
								<button type="submit">Subscribe</button>
							</form>
						</div>
					</div>
					<p className="copy">&copy; 2023 Dhaka International University. All rights reserved.</p>
				</footer>
			</article>
		</div>
	)
}
