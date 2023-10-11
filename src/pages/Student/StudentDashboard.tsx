import { Toaster } from "react-hot-toast"
import { Link, Outlet, useLocation } from "react-router-dom"

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
  let curLoc = useLocation()

  return (
    <>
      <h1>Students</h1>
      <CurrentUser />
      <nav style={{ textTransform: "uppercase" }}>
        <ul>
          <li>
            <Link
              to="/student"
              className={curLoc.pathname === "/student" ? "active " : ""}>
              Overview
            </Link>
          </li>
          <li>
            <Link
              to="/student/food"
              className={curLoc.pathname === "/student/food" ? "active " : ""}>
              Food
            </Link>
          </li>
          <li>
            <Link
              to="/student/payment"
              className={
                curLoc.pathname === "/student/payment" ? "active " : ""
              }>
              Payment
            </Link>
          </li>
          <li>
            <Link
              className={
                curLoc.pathname === "/student/settings" ? "active " : ""
              }
              to="/student/settings">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
