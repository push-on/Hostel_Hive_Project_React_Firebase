import { Link, Outlet, useLocation } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import CurrentUser from "../components/CurrentUser"
import NavBar from "../components/NavBar"

export default function Dashboard() {
  return (
    <div className="container">
      <NavBar />
      <Toaster />
      <DashboardNav />
      <Outlet />
    </div>
  )
}

function DashboardNav() {
  const [pageTitle, setPageTitle] = useState("")
  const titleMap = [
    { path: "/dashboard", title: "Overview" },
    { path: "/dashboard/student", title: "Students" },
    { path: "/dashboard/staff", title: "Staff" },
    { path: "/dashboard/food", title: "Food" },
    { path: "/dashboard/daily_meals", title: "Daily Meals" },
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
            <Link
              to="/dashboard"
              className={curLoc.pathname === "/dashboard" ? "active " : ""}>
              Overview
            </Link>{" "}
          </li>
          <li>
            <Link
              to="/dashboard/rooms"
              className={
                curLoc.pathname === "/dashboard/rooms"
                  ? "active nowrap"
                  : "nowrap"
              }>
              Rooms-&-Floor
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/student"
              className={
                curLoc.pathname === "/dashboard/student" ? "active " : ""
              }>
              Students
            </Link>
          </li>
          <li>
            <Link
              className={
                curLoc.pathname === "/dashboard/staff" ? "active " : ""
              }
              to="/dashboard/staff">
              Staffs
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/food"
              className={
                curLoc.pathname === "/dashboard/food" ? "active " : ""
              }>
              Food-Items
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/daily_meals"
              className={
                curLoc.pathname === "/dashboard/daily_meals" ? "active " : ""
              }>
              Daily-Meals
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/payment"
              className={
                curLoc.pathname === "/dashboard/payment" ? "active " : ""
              }>
              Payment
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/instructions"
              className={
                curLoc.pathname === "/dashboard/instructions" ? "active " : ""
              }>
              Instructions
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
