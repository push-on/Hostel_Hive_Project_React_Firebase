import { Routes, Route, useLocation, } from "react-router-dom"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { userType } from "./context/UserType"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import RootPage from "./pages/RootPage"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import NotFound from "./pages/NotFound"
import Students from "./pages/Dashbord/Students"
import Staff from "./pages/Dashbord/Staff"
import Food from "./pages/Dashbord/Food"
import Payments from "./pages/Dashbord/Payment"
import Rooms from "./pages/Dashbord/Room"
import Overview from "./pages/Dashbord/Overview"
import Profile from "./pages/Dashbord/Profile"
import Settings from "./pages/Settings"
import ProtectedRoutes from "./context/ProtectedRoutes"

export default function App() {
  const [isState, setState] = useState("student")
  const location = useLocation()

  useEffect(() => {
    userType(isState)
  }, [isState])


  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="student" element={<Students />} />
              <Route path="staff" element={<Staff />} />
              <Route path="food" element={<Food />} />
              <Route path="payment" element={<Payments />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="/" element={
            <motion.div
              initial={{ x: '100vw', opacity: 0 }}
              animate={{ x: '0vw', opacity: 1 }}
              exit={{ x: '-100vw', opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <RootPage />
            </motion.div>
          } />
          <Route path="/login" element={
            <Login isState={isState} setState={setState} />
          } />
          <Route path="/signup" element={
            <SignUp />
          } />
          <Route path="/about" element={
            <motion.div
              initial={{ x: '100vw', opacity: 0 }}
              animate={{ x: '0vw', opacity: 1 }}
              exit={{ x: '-100vw', opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <About />
            </motion.div>
          } />
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





