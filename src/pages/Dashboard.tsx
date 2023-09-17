import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { Toaster, toast } from "react-hot-toast"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'


export default function Dashboard() {
	const navigate = useNavigate()
	const { dispatch, currentRole, currentUser } = useContext(AuthContext)

	// Logout
	const HandleLogout = async (e: React.FormEvent) => {
		e.preventDefault()
		await signOut(auth).then(() => {
			navigate('/', { replace: true })
			setTimeout(() => {
				toast.success("logged out")
				dispatch({ type: 'LOGOUT', payload: null , role: '' })
			}, 300)
		}).catch(error => {
			toast.error(error.message)
		})
	}

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
								<li><Link to="/dashboard/profile">Profile</Link></li>
								<li><Link to="/dashboard/settings">settings</Link></li>
								<li><button className="outline" onClick={HandleLogout}>Logout</button></li>
							</ul>
						</details>
					</li>
				</ul>
			</nav>
			<Toaster />
			<DashbordNav />
			<Outlet />
		</div>
	)
}

function DashbordNav() {
	const [pageTitle, setPageTitle] = useState('')
	const titleMap = [
		{ path: '/dashboard', title: 'Overview' },
		{ path: '/dashboard/student', title: 'Students' },
		{ path: '/dashboard/staff', title: 'Staff' },
		{ path: '/dashboard/food', title: 'Food' },
		{ path: '/dashboard/payment', title: 'Payment' },
		{ path: '/dashboard/rooms', title: 'Rooms & Floor' },
	]
	let curLoc = useLocation()
	useEffect(() => {
		const curTitle = titleMap.find(item => item.path === curLoc.pathname)
		if (curTitle && curTitle.title) {
			setPageTitle(curTitle.title)
			document.title = curTitle.title
		}
	}, [curLoc])
	return (
		<article>
			<h1>Manage {pageTitle}</h1>
			<nav>
				<ul>
					<li><Link to="/dashboard/">Overview</Link></li>
					<li><Link to="/dashboard/rooms" className='nowrap'>Rooms & Floor</Link></li>
					<li><Link to="/dashboard/student">Students</Link></li>
					<li><Link to="/dashboard/staff">Staffs</Link></li>
					<li><Link to="/dashboard/food">Food</Link></li>
					<li><Link to="/dashboard/payment">Payment</Link></li>
				</ul>
			</nav>
		</article>
	)
}