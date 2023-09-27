import { useContext, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase"

export default function StudentsDashboard() {
	const navigate = useNavigate()
	const { dispatch, currentRole, currentUser } = useContext(AuthContext)
	
	// Logout
	const HandleLogout = async (e: React.FormEvent) => {
		e.preventDefault()
		await signOut(auth).then(() => {
			navigate('/', { replace: true })
			setTimeout(() => {
				toast.success("logged out")
				dispatch({ type: 'LOGOUT', payload: null, role: '' })
			}, 300)
		}).catch(error => {
			toast.error(error.message)
		})
	}

	useEffect(() => {
		if (currentUser === null) {
			navigate('/', { replace: true })
		}
	}, [])
	
	return (
		<div className="container">
			<nav>
				<ul>
					<li><strong>User:</strong></li>
					<li><strong>{currentUser?.email}</strong></li>
					<li><strong className='nowrap'>Role: {currentRole}</strong></li>
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
			<Outlet/>
		</div>
	)
}

function StudentNav() {
	return (
		<article>
			<h1>Students</h1>
			<nav>
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