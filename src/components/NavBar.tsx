import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


export default function NavBar() {
	const { currentUser, currentRole } = useContext(AuthContext)
	let curLoc = useLocation()
	console.log(curLoc.pathname);
	
	return (
		<nav style={{ textTransform: "uppercase" }}>
			<ul>
				<li className="nowrap" style={{ fontSize: "30px" }}><strong><Link to="/">Hostel Hive</Link></strong></li>

			</ul>
			<ul>
				<li><Link className={curLoc.pathname === "/rooms" ? "active" : ""} to="/rooms">Rooms</Link></li>
				<li><Link className={curLoc.pathname === "/foods" ? "active" : ""} to="/foods">Foods</Link></li>
				<li><Link className={curLoc.pathname === "/about" ? "active" : ""} to="/about">About</Link></li>
				{currentUser !== null && currentRole === "admin"
					?
					(<li><Link className={curLoc.pathname === "/dashboard" ? "active" : ""} to="/dashboard">Dashboard</Link></li>)
					:
					currentUser !== null && currentRole === "student"
						?
						(<li><Link className={curLoc.pathname === "/student" ? "active" : ""} to="/student">Dashboard</Link></li>)
						:
						currentUser !== null && currentRole === "staff"
							?
							(<li><Link className={curLoc.pathname === "/staff" ? "active" : ""} to="/staff">Dashboard</Link></li>)
							:
							(<li><Link className={curLoc.pathname === "/login" ? "active" : ""} to="/login">Login</Link></li>)
				}
			</ul>
		</nav>
	)
}
