import { useContext } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase"

export default function StudentsDashboard() {
	const navigate = useNavigate()
	const { dispatch, currentRole, currentUser } = useContext(AuthContext)

	// Logout
	const HandleLogout = (e: React.FormEvent) => {
		e.preventDefault()
		toast.promise(
			signOut(auth).then(() => {
				navigate('/', { replace: true })
				dispatch({ type: 'LOGOUT', payload: null, role: null })
			}), {
			loading: 'Logout...',
			success: <b>Logged out!</b>,
			error: <b>Failed to logout!</b>,
		})
	}

	return (
		<div className="container">
			<nav style={{ textTransform: "uppercase" }}>
				<ul>
					<li style={{ fontSize: "30px" }}><strong><Link to="/">HOSETEL HIVE</Link></strong></li>
					<li style={{ color: "greenyellow" }}>User: {currentUser === null ? "User Not Logged in" : currentUser?.email}</li>
					<li className="nowrap" style={{ color: "greenyellow" }}>Role: {currentRole === null ? "Public" : currentRole}</li>
				</ul>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li>
						<details className="dropdown">
							<summary >Profile</summary>
							<ul>
								<li><Link to="/student/">Profile</Link></li>
								<li><button className="outline" onClick={HandleLogout}>Logout</button></li>
							</ul>
						</details>
					</li>
				</ul>
			</nav>
			<Toaster />
			<StudentNav />
			<Outlet />
		</div>
	)
}

function StudentNav() {
	return (
		<article>
			<h1>Students</h1>
			<nav style={{ textTransform: "uppercase" }}>
				<ul>
					<li><Link to="/student/">Overview</Link></li>
					<li><Link to="/student/food">Food</Link></li>
					<li><Link to="/student/payment">Payment</Link></li>
					<li><Link to="/student/room">Room & Floor</Link></li>
					<li><Link to="/student/settings">Settings</Link></li>
				</ul>
			</nav>
		</article>
	)
}