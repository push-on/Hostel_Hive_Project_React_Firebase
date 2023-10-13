import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"

export default function Payments() {
  const [Payments, setPayments] = useState<any>()
  const [foodPayments, setFoodPayments] = useState<any>()
  const [user, setUser] = useState<any>()
  const [userModal, setUserModal] = useState(false)
  const getUser = async (uid: string) => {
    if (uid) {
      const documentRef = doc(db, "students", uid)
      getDoc(documentRef)
        .then((doc) => {
          setUser(doc.data())
          setUserModal(true)
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    } else {
      toast.error("UID Not Found")
    }
  }
  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "payments"))
      const foodData = await getDocs(collection(db, "food_subscriptions"))
      const foodPaymentData = foodData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setPayments(userData)
      setFoodPayments(foodPaymentData)
    } catch (error: any) {
      toast.error(error.message)
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
      <h2>Payment History</h2>
      {userModal && <ShowUser setModal={setUserModal} User={user} />}
      <table>
        <thead>
          <tr>
            <th>User Details</th>
            <th>Contact Info</th>
            <th>Room Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Payments?.map((payment: any) => (
            <tr key={payment?.id}>
              <td>
                <button className="btn" onClick={() => getUser(payment?.id)}>
                  View
                </button>
              </td>
              <td>{payment?.phone}</td>
              <td style={{ textTransform: "capitalize" }}>
                {payment?.room_type} Room
              </td>
              <td>
                <em
                  data-tooltip={
                    payment?.description ? payment?.description : "empty"
                  }>
                  Description
                </em>
              </td>
              <td>{payment?.price}TK</td>
              <td>{payment?.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>User Details</th>
            <th>ID</th>
            <th>Room Type</th>
            <th>Description</th>
            <th>time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {foodPayments?.map((payment: any) => (
            <tr key={payment?.id}>
              <td>
                <button className="btn" onClick={() => getUser(payment?.id)}>
                  View
                </button>
              </td>
              <td>{payment?.id.slice(0, 7)}</td>
              <td style={{ textTransform: "capitalize" }}>{payment?.meal}</td>
              <td>
                <em
                  data-tooltip={
                    payment?.description ? payment?.description : "empty"
                  }>
                  Description
                </em>
              </td>
              <td>{payment?.time}</td>
              <td>{payment?.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.article>
  )
}

function ShowUser({ setModal, User }: any) {
  return (
    <dialog open>
      <article>
        <button
          onClick={() => setModal(false)}
          aria-label="Close"
          className="close outline secondary"
        />
        <h1>User Details</h1>
        <p style={{ textTransform: "capitalize" }}>
          <strong>User Name: </strong> {User?.student_name}
        </p>
        <p>
          <strong>User Email: </strong> {User?.student_email}
        </p>
        <p>
          <strong>Phone Number: </strong> {User?.phone}
        </p>
        <p>
          <strong>Created At:</strong> {User?.created_at}
        </p>
        <p>
          <strong>Address: </strong>
          {User?.address === "" ? "Not Assigned" : User?.address}
        </p>
        <p>
          <strong>Guardian Number: </strong>
          {User?.guardian_name === "" ? "Not Assigned" : User?.guardian_name}
        </p>
        <p>
          <strong>Guardian Number: </strong>
          {User?.emergency_num === "" ? "Not Assigned" : User?.emergency_num}
        </p>
        <p>
          <strong>Gender: </strong>
          {User?.gender === "" ? "Not Assigned" : User?.gender}
        </p>
        <p>
          <strong>Religion: </strong>
          {User?.religion === "" ? "Not Assigned" : User?.religion}
        </p>
        <p>
          <strong>Nationality: </strong>
          {User?.nationality === "" ? "Not Assigned" : User?.nationality}
        </p>
      </article>
    </dialog>
  )
}
