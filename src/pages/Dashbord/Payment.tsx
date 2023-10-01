import { useState } from "react"

import { motion } from "framer-motion"

const dummyPaymentData = [
  {
    id: "1",
    user_id: "1",
    room_id: "101",
    payment_type: "Cash",
    amount: "৳1000",
    transaction_id: "TXN12345",
    payment_date: "2023-08-05",
    status: "completed",
  },
  {
    id: "2",
    user_id: "2",
    room_id: "102",
    payment_type: "Credit Card",
    amount: "৳1200",
    transaction_id: "TXN67890",
    payment_date: "2023-08-10",
    status: "completed",
  },
  {
    id: "3",
    user_id: "3",
    room_id: "103",
    payment_type: "Bank Transfer",
    amount: "৳1500",
    transaction_id: "TXN98765",
    payment_date: "2023-08-15",
    status: "completed",
  },
  {
    id: "4",
    user_id: "4",
    room_id: "104",
    payment_type: "Cash",
    amount: "৳800",
    transaction_id: "TXN54321",
    payment_date: "2023-08-20",
    status: "completed",
  },
  {
    id: "5",
    user_id: "5",
    room_id: "105",
    payment_type: "Credit Card",
    amount: "৳1100",
    transaction_id: "TXN24680",
    payment_date: "2023-08-25",
    status: "completed",
  },
  {
    id: "6",
    user_id: "6",
    room_id: "106",
    payment_type: "Cash",
    amount: "৳900",
    transaction_id: "TXN13579",
    payment_date: "2023-08-30",
    status: "completed",
  },
  {
    id: "7",
    user_id: "7",
    room_id: "107",
    payment_type: "Bank Transfer",
    amount: "৳1300",
    transaction_id: "TXN56789",
    payment_date: "2023-09-05",
    status: "completed",
  },
  // Add more payment data here
]

export default function Payments() {
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
            <h1>Payment Management</h1>
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
      <h2>Payments</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Room ID</th>
            <th>Payment Type</th>
            <th>Amount (৳)</th>
            <th>Transaction ID</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.user_id}</td>
              <td>{payment.room_id}</td>
              <td>{payment.payment_type}</td>
              <td>{payment.amount}</td>
              <td>{payment.transaction_id}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.status}</td>
              <td>
                <button className="btn">Edit</button>
              </td>
              <td>
                <button className="btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
