import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
	const { currentUser, currentRole } = useContext(AuthContext)
	console.log(currentRole)

	return (
		currentUser !== null && currentRole === "student"
			?
			<Outlet />
			:
			<Navigate to="/" replace />
	)
}
