import { Toaster } from "react-hot-toast"
import { Link, Outlet } from "react-router-dom"

import CurrentUser from "../../components/CurrentUser"
import NavBar from "../../components/NavBar"

export default function StaffDashboard() {
  return (
    <div className="container">
      <NavBar />

      <Toaster />
      <Staff />
      <Outlet />
    </div>
  )
}

function Staff() {
  return (
    <>
      <h1>Staffs</h1>
      <CurrentUser />
      <nav style={{ textTransform: "uppercase" }}>
        <ul>
          <li>
            <Link to="/staff/">Overview</Link>
          </li>
          <li>
            <Link to="/staff/role">Role</Link>
          </li>
          <li>
            <Link to="/staff/schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/staff/settings">settings</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
