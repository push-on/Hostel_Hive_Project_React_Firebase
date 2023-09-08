import { motion } from "framer-motion"


export default function Settings() {
	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
		>
			<hgroup>
				<h1>Settings</h1>
				<p>Admin Settings</p>
			</hgroup>

			<article>
				
			</article>
		</motion.div>
	)
}
