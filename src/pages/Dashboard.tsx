import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { Toaster, toast } from "react-hot-toast"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import CurrentUser from "../components/CurrentUser"

export default function Dashboard() {
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  // Logout
  const HandleLogout = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(
      signOut(auth).then(() => {
        navigate("/", { replace: true })
        dispatch({ type: "LOGOUT", payload: null, role: null })
      }),
      {
        loading: "Logout...",
        success: <b>Logged out!</b>,
        error: <b>Failed to logout!</b>,
      }
    )
  }

  return (
    <div className="container">
      <nav style={{ textTransform: "uppercase" }}>
        <ul>
          <li style={{ fontSize: "30px" }}>
            <strong>
              <Link to="/">HOSTEL HIVE</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <details className="dropdown">
              <summary>Profile</summary>
              <ul>
                <li>
                  <Link to="/dashboard/">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/settings">settings</Link>
                </li>
                <li>
                  <button className="outline" onClick={HandleLogout}>
                    Logout
                  </button>
                </li>
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
  const [pageTitle, setPageTitle] = useState("")
  const titleMap = [
    { path: "/dashboard", title: "Overview" },
    { path: "/dashboard/student", title: "Students" },
    { path: "/dashboard/staff", title: "Staff" },
    { path: "/dashboard/food", title: "Food" },
    { path: "/dashboard/payment", title: "Payment" },
    { path: "/dashboard/rooms", title: "Rooms & Floor" },
  ]
  let curLoc = useLocation()
  useEffect(() => {
    const curTitle = titleMap.find((item) => item.path === curLoc.pathname)
    if (curTitle && curTitle.title) {
      setPageTitle(curTitle.title)
      document.title = curTitle.title
    }
  }, [curLoc])
  return (
    <>
      <hgroup>
        <h1>Manage {pageTitle}</h1>
        <CurrentUser />
      </hgroup>
      <nav style={{ textTransform: "uppercase" }}>
        <ul>
          <li>
            <Link to="/dashboard/">Overview</Link>{" "}
          </li>
          <li>
            <Link to="/dashboard/rooms" className="nowrap">
              Rooms & Floor
            </Link>
          </li>
          <li>
            <Link to="/dashboard/student">Students</Link>
          </li>
          <li>
            <Link to="/dashboard/staff">Staffs</Link>
          </li>
          <li>
            <Link to="/dashboard/food">Food</Link>
          </li>
          <li>
            <Link to="/dashboard/payment">Payment</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
