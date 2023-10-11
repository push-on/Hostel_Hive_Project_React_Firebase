import { useState, useEffect } from "react"
import { db } from "../../config/firebase"

import { getDocs, collection, getDoc, doc, updateDoc } from "firebase/firestore"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

interface Student {
  id: string
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])

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
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <nav>
        <ul>
          <li>
            <h1>Student Details</h1>
          </li>
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Phone</th>
            <th>room</th>
            <th>floor</th>
            <th>Valid till</th>
            <th>Validity</th>
            <th>Action</th>
            <th>End Subscription</th>
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
              <td>{student?.phone ? student?.phone : "Not Available"}</td>
              <td>
                {student?.student_room ? student?.student_room : "Not Booked"}
              </td>
              <td>
                {student?.student_floor ? student?.student_floor : "Not Booked"}
              </td>
              <td>{student?.validity}</td>
              <td>
                {student?.validity &&
                  `${Math.ceil(
                    (new Date(student.validity).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )} days`}
              </td>
              <td>
                <button className="btn" onClick={() => Approval(student?.id)}>
                  Approve
                </button>
              </td>
              <td>
                <button className="btn" onClick={() => reset(student?.id)}>
                  End
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.article>
  )
}
