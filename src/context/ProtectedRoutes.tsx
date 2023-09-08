import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes () {
	const { currentUser } = useContext(AuthContext)

	return (
		currentUser !== null ? <Outlet /> : <Navigate to="/login" replace />
	)
}
