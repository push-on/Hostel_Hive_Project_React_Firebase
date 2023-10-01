import { motion } from "framer-motion"

export default function Rooms() {
	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}>
			<article>
				<h1>Room Management</h1>
				<nav>
					<ul></ul>
					<ul>
						<li>
							<button>Create Room Types</button>
						</li>
					</ul>
				</nav>
				<h2>Types Of Rooms</h2>
				<table>
					<thead>
						<tr>
							<th>name</th>
							<th>description</th>
							<th>beds</th>
							<th>ac</th>
							<th>wifi</th>
							<th>foodService</th>
							<th>price</th>
							<th>image</th>
							<th>Bathroom</th>
							<th>Desk</th>
							<th>Wardrobe</th>
						</tr>
					</thead>
					<tbody>
						<tr >
							<td>Single</td>
							<td>1 students room</td>
							<td>1</td>
							<td>true</td>
							<td>true</td>
							<td>true</td>
							<td>12,000</td>
							<td>img_url</td>
							<td>Private</td>
							<td>1</td>
							<td>1</td>
						</tr>
						<tr >
							<td>Double</td>
							<td>2 students room</td>
							<td>2</td>
							<td>true</td>
							<td>true</td>
							<td>true</td>
							<td>6,000</td>
							<td>img_url</td>
							<td>Shared</td>
							<td>2</td>
							<td>2</td>
						</tr>
						<tr >
							<td>Shared</td>
							<td>4 students room</td>
							<td>4</td>
							<td>true</td>
							<td>true</td>
							<td>true</td>
							<td>3,000</td>
							<td>img_url</td>
							<td>Shared</td>
							<td>4</td>
							<td>4</td>
						</tr>
					</tbody>
				</table>
			</article>
			<article>
				<h2>Availability</h2>
				<nav>
					<ul></ul>
					<ul>
						<li>
							<button>Add Rooms</button>
						</li>
					</ul>
				</nav>
				<table>
					<thead>
						<tr>
							<th>Room Type</th>
							<th>Floor No</th>
							<th>Room No</th>
							<th>Bed Available</th>
							<th>Status</th>
							<th>Assign</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						<tr >
							<td>Shared</td>
							<td>02</td>
							<td>201</td>
							<td>2</td>
							<td>Active</td>
							<td><button className="btn">Assign</button></td>
							<td><button className="btn">Remove</button></td>
						</tr>
						<tr >
							<td>Shared</td>
							<td>02</td>
							<td>201</td>
							<td>2</td>
							<td>Active</td>
							<td><button className="btn">Assign</button></td>
							<td><button className="btn">Remove</button></td>
						</tr>
					</tbody>
				</table>
			</article>
		</motion.div>
	)
}
