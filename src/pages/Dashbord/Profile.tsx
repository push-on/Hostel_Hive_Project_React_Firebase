import { motion } from "framer-motion"


export default function Profile() {

	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
		>
			<hgroup>
				<h1>Profile</h1>
				<p>Admin Profile</p>
			</hgroup>

			<article>
				<p>User Name:</p>
				<p>User Email:</p>
				<p>User Role:</p>
			</article>
		</motion.div>
	)
}
