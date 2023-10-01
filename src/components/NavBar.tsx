import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


export default function NavBar() {
	const { currentUser, currentRole } = useContext(AuthContext)

	return (
		<nav style={{ textTransform: "uppercase" }}>
			<ul>
				<li className="nowrap" style={{ fontSize: "30px" }}><strong><Link to="/">Hostel Hive</Link></strong></li>

			</ul>
			<ul>
				<li><Link to="/rooms">Rooms</Link></li>
				<li><Link to="/foods">Foods</Link></li>
				<li><Link to="/about">About</Link></li>
				{currentUser !== null && currentRole === "admin"
					?
					(<li><Link to="/dashboard">Dashboard</Link></li>)
					:
					currentUser !== null && currentRole === "student"
						?
						(<li><Link to="/student">Dashboard</Link></li>)
						:
						currentUser !== null && currentRole === "staff"
							?
							(<li><Link to="/staff">Dashboard</Link></li>)
							:
							(<li><Link to="/login">Login</Link></li>)
				}
			</ul>
		</nav>
	)
}
