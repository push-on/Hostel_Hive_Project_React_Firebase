import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import RootPage from "./pages/HomePage/RootPage"
import About from "./pages/HomePage/About"
import SignUp from "./pages/SignUp"
import NotFound from "./pages/NotFound"
import Students from "./pages/Dashboard/Students"
import Staff from "./pages/Dashboard/Staff"
import Food from "./pages/Dashboard/Food"
import Payments from "./pages/Dashboard/Payment"
import Rooms from "./pages/Dashboard/Room"
import Overview from "./pages/Dashboard/Overview"
import Settings from "./pages/Dashboard/Settings"
import ProtectedRoutes from "./context/ProtectedRoutes"
import ProtectedProfiles from "./context/ProtectedProfiles"
import ProtectedStaff from "./context/ProtectedStaff"
import StudentsDashboard from "./pages/Student/StudentDashboard"
import StudentOverview from "./pages/Student/StudentOverview"
import StudentsFood from "./pages/Student/StudentsFood"
import StudentPayment from "./pages/Student/StudentPayment"
import StaffDashboard from "./pages/Staff/StaffDashboard"
import StaffOverview from "./pages/Staff/StaffOverview"
import StudentFloor from "./pages/Student/StudentFloor"
import StudentSettings from "./pages/Student/StudentSettings"
import StaffRole from "./pages/Staff/StaffRole"
import StaffSettings from "./pages/Staff/StaffSettings"
import StaffSchedule from "./pages/Staff/StaffSchedule"
import RootFoods from "./pages/HomePage/RootFoods"
import RootRooms from "./pages/HomePage/RootRooms"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./context/AuthContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "./config/firebase"
import Loading from "./components/Loading"

export default function App() {
  const location = useLocation()
  const { dispatch, currentUser } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  function getCurrentUser() {
    if (currentUser !== null) {
      setLoading(true)
      getDoc(doc(db, "users", currentUser.uid)).then((doc) => {
        dispatch({
          type: "LOGIN",
          payload: currentUser,
          role: doc.data()?.role,
          paymentStatus: doc.data()?.paymentStatus,
        })
      })
      setLoading(false)
    }
  }
  useEffect(() => {
    getCurrentUser()
    console.log(currentUser)
  }, [])

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedProfiles />}>
            <Route path="student" element={<StudentsDashboard />}>
              <Route index element={<StudentOverview />} />
              <Route path="food" element={<StudentsFood />} />
              <Route path="payment" element={<StudentPayment />} />
              <Route path="room" element={<StudentFloor />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>
          </Route>
          <Route element={<ProtectedStaff />}>
            <Route path="staff" element={<StaffDashboard />}>
              <Route index element={<StaffOverview />} />
              <Route
                path="role"
                element={
                  <motion.div
                    initial={{ x: "100vw", opacity: 0 }}
                    animate={{ x: "0vw", opacity: 1 }}
                    exit={{ x: "-100vw", opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}>
                    <StaffRole />
                  </motion.div>
                }
              />
              <Route
                path="schedule"
                element={
                  <motion.div
                    initial={{ x: "100vw", opacity: 0 }}
                    animate={{ x: "0vw", opacity: 1 }}
                    exit={{ x: "-100vw", opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}>
                    <StaffSchedule />
                  </motion.div>
                }
              />
              <Route
                path="settings"
                element={
                  <motion.div
                    initial={{ x: "100vw", opacity: 0 }}
                    animate={{ x: "0vw", opacity: 1 }}
                    exit={{ x: "-100vw", opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}>
                    <StaffSettings />
                  </motion.div>
                }
              />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="student" element={<Students />} />
              <Route path="staff" element={<Staff />} />
              <Route path="food" element={<Food />} />
              <Route path="payment" element={<Payments />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="/" element={<RootPage />} />
          <Route path="/foods" element={<RootFoods />} />
          <Route path="/rooms" element={<RootRooms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <motion.div
                initial={{ x: "100vw", opacity: 0 }}
                animate={{ x: "0vw", opacity: 1 }}
                exit={{ x: "-100vw", opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}>
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}
