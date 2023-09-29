
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"

export default function RootRooms() {

	return (
		<div className="container">
			<NavBar />

			<motion.div
				initial={{ x: '100vw', opacity: 0 }}
				animate={{ x: '0vw', opacity: 1 }}
				exit={{ x: '-100vw', opacity: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.2 }}>
				<article>
					<header>
						<h1>Rooms</h1>
					</header>
					<footer>
						
					</footer>
				</article>
			</motion.div>
			<Footer />
		</div>
	)
}
