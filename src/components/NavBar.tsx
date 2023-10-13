import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"

export default function NavBar() {
  const { currentUser, currentRole } = useContext(AuthContext)
  let curLoc = useLocation()
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const HandleLogout = (e: React.FormEvent) => {
    e.preventDefault()

    signOut(auth)
      .then(() => {
        navigate("/", { replace: true })
        dispatch({
          type: "LOGOUT",
          payload: null,
          role: null,
          paymentStatus: null,
        })
        toast.success("Logged Out")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <nav style={{ textTransform: "uppercase" }}>
      <ul>
        <li className="nowrap" style={{ fontSize: "30px" }}>
          <strong>
            <Link to="/">Hostel Hive</Link>
          </strong>
        </li>
      </ul>
      <ul>
        {currentRole !== "admin" && currentRole !== "staff" && (
          <>
            <li>
              <Link
                className={curLoc.pathname === "/rooms" ? "active" : ""}
                to="/rooms">
                Rooms
              </Link>
            </li>
            <li>
              <Link
                className={curLoc.pathname === "/foods" ? "active" : ""}
                to="/foods">
                meals
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            className={curLoc.pathname === "/about" ? "active" : ""}
            to="/about">
            About
          </Link>
        </li>
        {currentUser !== null && currentRole === "admin" ? (
          <li>
            <Link
              className={curLoc.pathname.includes("/dashboard") ? "active" : ""}
              to="/dashboard">
              Dashboard
            </Link>
          </li>
        ) : currentUser !== null && currentRole === "student" ? (
          <li>
            <Link
              className={curLoc.pathname.includes("/student") ? "active" : ""}
              to="/student">
              Dashboard
            </Link>
          </li>
        ) : currentUser !== null && currentRole === "staff" ? (
          <li>
            <Link
              className={curLoc.pathname.includes("/student") ? "active" : ""}
              to="/staff">
              Dashboard
            </Link>
          </li>
        ) : (
          <li>
            <Link
              className={curLoc.pathname === "/login" ? "active " : ""}
              to="/login">
              Login
            </Link>
          </li>
        )}
        {currentUser ? (
          <li>
            <button className="outline" onClick={HandleLogout}>
              Logout
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  )
}
