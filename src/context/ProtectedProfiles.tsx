import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes() {
	const { currentUser, currentRole } = useContext(AuthContext)

	return (
		currentUser !== null && currentRole === "student"
			?
			<Outlet />
			:
			currentUser !== null && currentRole === "student"
				?
				<Navigate to="/student" replace />
				:
				currentUser !== null && currentRole === "staff"
					?
					<Navigate to="/staff" replace />
					:
					<Navigate to="/login" replace />
	)
}
