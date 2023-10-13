import { useState, useEffect } from "react"
import { db } from "../../config/firebase"

import { getDocs, collection, getDoc, doc, updateDoc } from "firebase/firestore"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { AiOutlineEdit } from "react-icons/ai"

interface Student {
  id: string
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [editModal, setEditModal] = useState(false)
  const [selected, setSelected] = useState("")
  const [singleStudent, setSingleStudent] = useState<any>()
  const myCollectionRef = collection(db, "students")

  const getData = async () => {
    try {
      const data = await getDocs(myCollectionRef)
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setStudents(userData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    try {
      const { name, value } = event.target
      setSingleStudent((prev: any) => ({ ...prev, [name]: value }))
    } catch (error) {
      console.log(error)
    }
  }
  async function Approval(id: string) {
    const docs = await getDoc(doc(db, "users", id))
    const docs_ = await getDoc(doc(db, "payments", id))
    if (
      docs.data()?.paymentStatus === "paid" &&
      docs_.data()?.paymentStatus === "paid"
    ) {
      toast.error("Already Approved")
      return
    }

    updateDoc(doc(db, "students", id), {
      validity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    })
    updateDoc(doc(db, "payments", id), {
      paymentStatus: "paid",
      validity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    })
    updateDoc(doc(db, "users", id), {
      paymentStatus: "paid",
      validity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    }).then(() => {
      toast.success("Approved")
      getData()
    })
  }
  async function reset(id: string) {
    const docs = await getDoc(doc(db, "users", id))
    const docs_ = await getDoc(doc(db, "payments", id))
    if (
      docs.data()?.paymentStatus !== "paid" &&
      docs_.data()?.paymentStatus !== "paid"
    ) {
      toast.error("Already Set")
      return
    }
    updateDoc(doc(db, "students", id), {
      validity: new Date()
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    })
    updateDoc(doc(db, "payments", id), {
      paymentStatus: "unpaid",
      description: "",
      price: "",
      room_type: "",
      validity: new Date()
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    })
    updateDoc(doc(db, "users", id), {
      paymentStatus: "unpaid",
      validity: new Date()
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-"),
    }).then(() => {
      toast.success("successfully reset")
      getData()
    })
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <motion.article
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
      style={{ overflowX: "scroll" }}>
      <nav>
        <ul>
          <li>
            <h1>Student Details</h1>
          </li>
        </ul>
      </nav>
      {editModal && (
        <dialog open={editModal}>
          <EditStudent
            setModal={setEditModal}
            onChange={handleOnChange}
            student={singleStudent}
            setStudent={setSingleStudent}
            getData={getData}
            id={selected}
          />
        </dialog>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Floor</th>
            <th>Room</th>
            <th data-tooltip="Assign room & floor">Assign</th>
            <th>Valid-till</th>
            <th>Validity</th>
            <th>Action</th>
            <th>Subscription</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student: any) => (
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              key={student?.id}>
              {student?.student_name &&
                student.student_name.split(" ").slice(0, 2).join(" ")}
              <td>{student?.phone ? student?.phone : "Not Available"} </td>
              <td>
                {student?.hostel_floor ? student?.hostel_floor : "not assigned"}
              </td>
              <td>
                {student?.hostel_room ? student?.hostel_room : "not assigned"}
              </td>
              <td>
                <button
                  className="btn"
                  data-tooltip="Assign room & floor"
                  onClick={() => {
                    setSelected(student?.id)
                    setEditModal(true)
                  }}>
                  <AiOutlineEdit />
                </button>
              </td>
              <td>{student?.validity}</td>
              <td>
                {student?.validity &&
                  (() => {
                    const validityDate = new Date(student.validity)
                    const currentDate = new Date()
                    const daysRemaining = Math.ceil(
                      (validityDate.getTime() - currentDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                    if (daysRemaining > 0) {
                      return `${daysRemaining} days`
                    } else {
                      return "Expired"
                    }
                  })()}
              </td>
              <td>
                <button
                  data-tooltip="Approve Student Booking"
                  className="btn"
                  onClick={() => Approval(student?.id)}>
                  Approve
                </button>
              </td>
              <td>
                <button
                  data-tooltip="Reset Validity"
                  className="btn"
                  onClick={() => reset(student?.id)}>
                  Validity
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.article>
  )
}

function EditStudent({
  setModal,
  onChange,
  id,
  student,
  setStudent,
  getData,
}: any) {
  const setStudentById = () => {
    try {
      getDoc(doc(db, "students", id))
        .then((doc) => {
          setStudent(doc.data())
          getData()
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateDoc(doc(db, "students", id), student)
      .then(() => {
        toast.success("Added Successfully")
        setStudent()
        setModal(false)
      })
      .catch((error) => {
        toast.error(error.message)
        setModal(false)
      })
  }

  useEffect(() => {
    setStudentById()
  }, [])
  return (
    <article>
      <h1>Assign Room & Floor</h1>
      <button
        className="close contrast "
        onClick={() => {
          setModal(false)
        }}
      />
      <form onSubmit={handleSubmit}>
        <label>Assign Room</label>
        <input
          name="hostel_room"
          type="number"
          required
          value={student?.hostel_room}
          onChange={onChange}
        />
        <label>Assign floor</label>
        <input
          name="hostel_floor"
          type="number"
          required
          value={student?.hostel_floor}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}
