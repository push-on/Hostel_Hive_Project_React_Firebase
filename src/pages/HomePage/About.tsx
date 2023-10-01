import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
import { Counter, CounterField } from "../../lib/Counter"
import { useEffect, useState } from "react"
import { CountingAnimation } from "../../lib/CounterAnimation"

export default function About() {
  const [TotalStudents, setTotalStudents] = useState(0)
  const [TotalStaff, setTotalStaff] = useState(0)
  const [TotalStudentsBooked, setTotalStudentsBooked] = useState(0)

  useEffect(() => {
    // get number of students
    Counter("students").then((data) => {
      setTotalStudents(data)
    })
    CounterField("students", "booked").then((data) => {
      setTotalStudentsBooked(data)
    })
    // get number of staffs
    Counter("staffs").then((data) => {
      setTotalStaff(data)
    })
  }, [])

  return (
    <div className="container">
      <NavBar />
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <article>
          <header>
            <hgroup>
              <h1>About Us</h1>
              <p>Integrated Student Hostel Solutions Empowering Institutions</p>
            </hgroup>
            <main>
              <p>
                Hostel Hive offers well-decorated hostels with modern
                facilities. Foreign students are living in the hostels with
                comfort. At present, there are seven boys hostels and one girl's
                hostel. In the hostels, there are prayer rooms, game rooms
                (indoor), common rooms, and a well-decorated canteen. All Hostel
                Hive hostels are under CC camera surveillance. Wi-Fi facilities
                are available. We have well-experienced cooks and well-trained
                security guards to serve the students.
              </p>
            </main>
          </header>
          <footer>
            <div className="grid">
              <h3>
                Students Registered: 0
                {<CountingAnimation value={TotalStudents} />}{" "}
              </h3>
              <h3>
                Students Booked: 0
                {<CountingAnimation value={TotalStudentsBooked} />}
              </h3>
              <h3>
                Staff Members: 0{<CountingAnimation value={TotalStaff} />}
              </h3>
            </div>
          </footer>
        </article>
        <article>
          <hgroup>
            <h1>Our Team</h1>
            <p>The Hostel Hive Team</p>
          </hgroup>
          <div className="grid">
            <hgroup>
              <h3>Imran Hossain</h3>
              <p></p>
              <p>roll: 53</p>
            </hgroup>
            <hgroup>
              <h3>Abu Bakar Raihan</h3>
              <p>roll: 52</p>
            </hgroup>
            <hgroup>
              <h3>Ashikuzzaman Pranto</h3>
              <p>roll: 00</p>
            </hgroup>
            <hgroup>
              <h3>Abu Sayed Khandaker</h3>
              <p>roll: 54</p>
            </hgroup>
            <hgroup>
              <h3>Siyam Khondker</h3>
              <p>role: 00</p>
            </hgroup>
          </div>
        </article>
        <article>
          <header>
            <hgroup>
              <h1>History Timeline</h1>
              <p>The Legacy of Hostel Hive</p>
            </hgroup>
            <main>
              <div className="grid">
                <div>
                  <strong>2023</strong>
                  <p>
                    Hostel Hive expanded to over 200 institute partnerships and
                    50,000 students by leveraging the latest technologies for
                    the education sector.
                  </p>
                </div>
                <div>
                  <strong>Today</strong>
                  <p>
                    Under "name"'s leadership, Hostel Hive continues to
                    transform hostel living and management using tailored
                    solutions. The company aims to further modernize hostel
                    operations for the education sector in Bangladesh.
                  </p>
                </div>
              </div>
            </main>
          </header>
          <Footer />
        </article>
      </motion.div>
    </div>
  )
}
