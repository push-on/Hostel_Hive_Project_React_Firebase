import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { db } from "../../config/firebase"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function StudentPayment() {
  const { currentUser } = useContext(AuthContext)
  const [User, setUser] = useState<any>()

  function getUser() {
    const uid = currentUser?.uid
    if (uid) {
      const documentRef = doc(db, "students", uid)
      getDoc(documentRef)
        .then((doc) => {
          setUser(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    } else {
      toast.error("UID Not Found")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <h1>Student Payment</h1>
      <Payments />

      <article>
        <p>
          <strong>User Name:</strong> {User?.student_name}
        </p>
        <p>
          <strong>User Email:</strong> {User?.student_email}
        </p>
        <p>
          <strong>Booked:</strong> {User?.booked ? "Yes" : "No"}
        </p>
        <p>
          <strong>Hostel Room:</strong>{" "}
          {User?.hostel_room === "" ? "Not Assigned" : User?.hostel_room}
        </p>
        <p>
          <strong>Hostel Floor:</strong>{" "}
          {User?.hostel_floor === "" ? "Not Assigned" : User?.hostel_floor}
        </p>
        <p>
          <strong>Created At:</strong> {User?.created_at}
        </p>
      </article>

      <motion.table
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}></motion.table>
    </motion.div>
  )
}
const dummyPaymentData = [
  {
    id: "1",
    user_id: "1",
    item: "Food: Chicken Polouw",
    payment_type: "Cash",
    amount: "৳1000",
    transaction_id: "TXN12345",
    payment_date: "2023-08-05",
    status: "completed",
  },
  {
    id: "2",
    user_id: "2",
    item: "Food: Beef Biryani",
    payment_type: "Credit Card",
    amount: "৳1200",
    transaction_id: "TXN67890",
    payment_date: "2023-08-10",
    status: "completed",
  },
  {
    id: "3",
    user_id: "3",
    item: "Food: Vegetable Curry",
    payment_type: "Bank Transfer",
    amount: "৳1500",
    transaction_id: "TXN98765",
    payment_date: "2023-08-15",
    status: "completed",
  },
  {
    id: "4",
    user_id: "4",
    item: "Food: Fish Fry",
    payment_type: "Cash",
    amount: "৳800",
    transaction_id: "TXN54321",
    payment_date: "2023-08-20",
    status: "completed",
  },
  {
    id: "5",
    user_id: "5",
    item: "Food: Shrimp Scampi",
    payment_type: "Credit Card",
    amount: "৳1100",
    transaction_id: "TXN24680",
    payment_date: "2023-08-25",
    status: "completed",
  },
  {
    id: "6",
    user_id: "6",
    item: "Food: Lamb Curry",
    payment_type: "Cash",
    amount: "৳900",
    transaction_id: "TXN13579",
    payment_date: "2023-08-30",
    status: "completed",
  },
  {
    id: "7",
    user_id: "7",
    item: "Food: Veggie Pizza",
    payment_type: "Bank Transfer",
    amount: "৳1300",
    transaction_id: "TXN56789",
    payment_date: "2023-09-05",
    status: "completed",
  },
]

function Payments() {
  const [payments, setPayments] = useState(dummyPaymentData)
  const [createPaymentMode, setCreatePaymentMode] = useState(false)

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: "0vw", opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      {" "}
      <nav>
        <ul>
          <li>
            <h1>Payment Log</h1>
          </li>
        </ul>
        <ul>
          <li>
            <button
              onClick={() => {
                setCreatePaymentMode(!createPaymentMode)
                setPayments(dummyPaymentData)
              }}>
              Make Payment
            </button>
          </li>
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Payment Type</th>
            <th>Amount (৳)</th>
            <th>Transaction ID</th>
            <th>Payment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.user_id}</td>
              <td>{payment.item}</td>
              <td>{payment.payment_type}</td>
              <td>{payment.amount}</td>
              <td>{payment.transaction_id}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
