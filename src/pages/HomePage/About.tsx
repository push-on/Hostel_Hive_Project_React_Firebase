import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
export default function About() {

	return (
		<div className="container">
			<NavBar />
			<motion.div>
				<article>
					<header>
						<hgroup>
							<h1>About Us</h1>
							<p>Integrated Student Hostel Solutions Empowering Institutions</p>
						</hgroup>
						<main>
							<p>
								Hostel Hive offers well-decorated hostels with modern facilities. Foreign students are living in the hostels with comfort. At present, there are seven boys hostels and one girl's hostel. In the hostels, there are prayer rooms, game rooms (indoor), common rooms, and a well-decorated canteen. All Hostel Hive hostels are under CC camera surveillance. Wi-Fi facilities are available. We have well-experienced cooks and well-trained security guards to serve the students.
							</p>
						</main>
					</header>
					<footer>
						<div className="grid">
							<h3>Students Booked: { }</h3>
							<h3>Active Hostels: { }</h3>
							<h3>Staff Members: { }</h3>
						</div>
					</footer>
				</article>
				<article>
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
									<strong>2023</strong>
									<p>Hostel Hive expanded to over 200 institute partnerships and 50,000 students by leveraging the latest technologies for the education sector.</p>
								</div>
								<div>
									<strong>Today</strong>
									<p>Under "name"'s leadership, Hostel Hive continues to transform hostel living and management using tailored solutions. The company aims to further modernize hostel operations for the education sector in Bangladesh.</p>
								</div>
							</div>
						</main>
					</header>
					<Footer />
				</article>


			</motion.div >
		</div>
	)
}
