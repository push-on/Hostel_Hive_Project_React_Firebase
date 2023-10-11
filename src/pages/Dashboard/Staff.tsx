import { useState, useEffect, useContext } from "react"
import { db } from "../../config/firebase"

import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"

import { AuthContext } from "../../context/AuthContext"

interface staff {
  id: string
}
export default function Staff() {
  const [staff, setStaff] = useState<staff[]>([])
  const [updateID, setUpdateID] = useState("")
  const [EditMode, setEditMode] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const myCollectionRef = collection(db, "staffs")

  const editData = async (id: string) => {
    if (currentUser) {
      setUpdateID(id)
      setEditMode(true)
    } else {
      toast.error("you are not logged in")
    }
  }

  const getData = async () => {
    try {
      const data = await getDocs(myCollectionRef)
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setStaff(userData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const deleteData = async (id: string) => {
    try {
      const docRef = doc(db, "staffs", id)
      await deleteDoc(docRef).then(() => {
        getData()
        toast.success("Deleted Successfully")
      })
    } catch (error) {
      toast.error("you are not logged in")
    }
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
      {" "}
      <nav>
        <ul>
          <li>
            <h1>Staff Details</h1>
          </li>
        </ul>
        <ul></ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Staff Email</th>
            <th>Staff Email</th>
            <th>Staff Email</th>
            <th>Assign</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember: any) => (
            <tr key={staffMember.id}>
              <td>{staffMember.staff_name}</td>
              <td>{staffMember.staff_email}</td>
              <td>{staffMember.task}</td>
              <td>{staffMember.room_no}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => editData(staffMember.id)}>
                  Assign
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => deleteData(staffMember.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {EditMode ? (
            <EditUser
              editData={editData}
              id={updateID}
              editMode={setEditMode}
              updateData={getData}
            />
          ) : (
            ""
          )}
        </tbody>
      </table>
    </motion.article>
  )
}

function EditUser({ editMode, id, updateData }: any) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [task, setTask] = useState("")
  const [roomNo, setRoomNo] = useState("")

  const getPreviousData = async () => {
    const docRef = doc(db, "staffs", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setFullName(docSnap.data()?.staff_name)
      setEmail(docSnap.data()?.staff_email)
      setCreatedAt(docSnap.data()?.created_at)
      setTask(docSnap.data()?.task)
      setRoomNo(docSnap.data()?.room_no)
    }
  }
  useEffect(() => {
    getPreviousData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const docRef = doc(db, "staffs", id)
      await updateDoc(docRef, {
        staff_name: fullName,
        staff_email: email,
        created_at: new Date()
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
        userID: id,
      }).then(() => {
        updateData()
        editMode(false)
        toast.success("Updated Successfully")
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <dialog open>
      <article>
        <h2>Assign Staff Work Order</h2>
        <p>Full Name: {fullName}</p>
        <p>Email: {email}</p>
        <form>
          <label>Shift Time</label>
          <input
            type="text"
            value={createdAt}
            required
            onChange={(e) => setCreatedAt(e.target.value)}></input>
          <label htmlFor=""> Work Order</label>
          <input
            type="text"
            value={task}
            required
            onChange={(e) => setTask(e.target.value)}></input>
          <label htmlFor=""> Room No</label>
          <input
            type="text"
            value={roomNo}
            required
            onChange={(e) => setRoomNo(e.target.value)}></input>
          <footer className="grid">
            <button className="outline" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="outline secondary"
              onClick={() => editMode(false)}>
              Close
            </button>
          </footer>
        </form>
      </article>
    </dialog>
  )
}
