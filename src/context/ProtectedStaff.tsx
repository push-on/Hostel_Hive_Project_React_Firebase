import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
	const { currentUser, currentRole } = useContext(AuthContext)

	return (
		currentUser !== null && currentRole === "staff"
			?
			<Outlet />
			:
			<Navigate to="/" replace />
	)
}
