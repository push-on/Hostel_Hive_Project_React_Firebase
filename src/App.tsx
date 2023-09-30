import { Routes, Route, useLocation, } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import RootPage from "./pages/HomePage/RootPage"
import About from "./pages/HomePage/About"
import SignUp from "./pages/SignUp"
import NotFound from "./pages/NotFound"
import Students from "./pages/Dashbord/Students"
import Staff from "./pages/Dashbord/Staff"
import Food from "./pages/Dashbord/Food"
import Payments from "./pages/Dashbord/Payment"
import Rooms from "./pages/Dashbord/Room"
import Overview from "./pages/Dashbord/Overview"
import Settings from "./pages/Settings"
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
import StaffSchedule from "./pages/Staff/StaffScedule"
import RootFoods from "./pages/HomePage/RootFoods"
import RootRooms from "./pages/HomePage/RootRooms"

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route element={<ProtectedProfiles />}>
            <Route path="student" element={<StudentsDashboard />} >
              <Route index element={<StudentOverview />} />
              <Route path="food" element={<StudentsFood />} />
              <Route path="payment" element={<StudentPayment />} />
              <Route path="room" element={<StudentFloor />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>
          </Route>
          <Route element={<ProtectedStaff />}>

            <Route path="staff" element={<StaffDashboard />} >
              <Route index element={<StaffOverview />} />
              <Route path="role" element={
                <motion.div
                  initial={{ x: '100vw', opacity: 0 }}
                  animate={{ x: '0vw', opacity: 1 }}
                  exit={{ x: '-100vw', opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.2 }}
                >
                  <StaffRole />
                </motion.div>
              } />
              <Route path="scedule" element={
                <motion.div
                  initial={{ x: '100vw', opacity: 0 }}
                  animate={{ x: '0vw', opacity: 1 }}
                  exit={{ x: '-100vw', opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.2 }}
                >
                  <StaffSchedule />
                </motion.div>


              } />
              <Route path="settings" element={
                <motion.div
                  initial={{ x: '100vw', opacity: 0 }}
                  animate={{ x: '0vw', opacity: 1 }}
                  exit={{ x: '-100vw', opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.2 }}
                >
                  <StaffSettings />
                </motion.div>
              } />
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
          <Route />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/signup" element={
            <SignUp />
          } />
          <Route path="/about" element={<About />} />
          <Route path="*" element={
            <motion.div
              initial={{ x: '100vw', opacity: 0 }}
              animate={{ x: '0vw', opacity: 1 }}
              exit={{ x: '-100vw', opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <NotFound />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </>
  )
}





