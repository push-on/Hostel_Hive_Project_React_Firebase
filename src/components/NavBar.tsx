import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


export default function NavBar() {
	const { currentUser, currentRole } = useContext(AuthContext)
	let curLoc = useLocation()

	return (
		<nav style={{ textTransform: "uppercase" }}>
			<ul>
				<li style={{ fontSize: "30px" }}><strong><Link to="/">Hostel Hive</Link></strong></li>
				<li style={{ color: "greenyellow" }}>User: {currentUser === null ? "User Not Logged in" : currentUser?.email}</li>
				<li className="nowrap" style={{ color: "greenyellow" }}>Role: {currentRole === null ? "Public" : currentRole}</li>
			</ul>
			<ul>
				{curLoc.pathname === "/rooms" ? null : <li><Link to="/rooms">Rooms</Link></li>}
				{curLoc.pathname === "/foods" ? null : <li><Link to="/foods">Foods</Link></li>}
				{curLoc.pathname === "/" ? <li><Link to="/about">About</Link></li> : <li><Link to="/">Home</Link></li>}
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
	)
}
