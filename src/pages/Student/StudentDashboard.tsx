import { Toaster } from "react-hot-toast"
import { Link, Outlet } from "react-router-dom"

import CurrentUser from "../../components/CurrentUser"
import NavBar from "../../components/NavBar"

export default function StudentsDashboard() {
  return (
    <div className="container">
      <Toaster />
      <NavBar />
      <StudentNav />
      <Outlet />
    </div>
  )
}

function StudentNav() {
  return (
    <>
      <h1>Students</h1>
      <CurrentUser />
      <nav style={{ textTransform: "uppercase" }}>
        <ul>
          <li>
            <Link to="/student/">Overview</Link>
          </li>
          <li>
            <Link to="/student/food">Food</Link>
          </li>
          <li>
            <Link to="/student/payment">Payment</Link>
          </li>
          <li>
            <Link to="/student/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
