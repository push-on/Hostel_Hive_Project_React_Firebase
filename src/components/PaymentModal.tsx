import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { motion } from "framer-motion"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

export default function PaymentModal({ setModal, id }: any) {
  const [selectedRoom, setSelectedRoom] = useState<any>()
  const [contactInfo, setContactInfo] = useState("")
  const [description, setDescription] = useState("")
  const { currentUser } = useContext(AuthContext)
  const [Payments, setPayments] = useState<any>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (contactInfo.length < 11) {
      toast.error("Invalid Contact Number")
      return
    } else if (description.length < 5) {
      toast.error("Invalid Description")
      return
    }
    if (currentUser?.uid) {
      await setDoc(doc(collection(db, "payments"), currentUser?.uid), {
        mail: currentUser?.email,
        userID: currentUser?.uid,
        room_type: selectedRoom?.room_type,
        price: selectedRoom?.price,
        description: description,
        phone: contactInfo,
        paymentStatus: "pending",
      })
        .then(() => {
          toast.success("Payment is being Processed")
          updateData()
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
  }

  async function updateData() {
    if (currentUser?.uid) {
      try {
        await updateDoc(doc(db, "students", currentUser?.uid), {
          phone: contactInfo,
        })
        await updateDoc(doc(db, "users", currentUser?.uid), {
          paymentStatus: "pending",
        })
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }

  async function getData() {
    const docs = await getDoc(doc(db, "room_types", id))
    setSelectedRoom(docs.data())
  }

  const getInstructionData = async () => {
    try {
      getDoc(doc(db, "instructions", "jnKliUnfxK9HVWsgAa4x"))
        .then((doc) => {
          setPayments(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (id !== "") {
      getData()
      getInstructionData()
    }
  }, [setModal])

  return (
    <dialog open>
      <article>
        <button
          onClick={() => setModal(false)}
          aria-label="Close"
          className="close outline secondary"
        />
        <hgroup>
          <h1>Complete Your Payment</h1>
        </hgroup>

        <table>
          <thead>
            <tr>
              <th>
                <strong>Selected Package</strong>
              </th>
              <th>
                <strong>Price</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              style={{ textTransform: "capitalize" }}>
              <td>{selectedRoom?.room_type} Room</td>
              <td>{selectedRoom?.price} TK</td>
            </motion.tr>
          </tbody>
        </table>
        <p>
          <strong>Title:</strong> {Payments?.title}
        </p>
        <p>
          <strong>Instructions:</strong> {Payments?.description}
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Phone Number:
            <input
              required
              type="number"
              onChange={(e) => setContactInfo(e.target.value)}
            />
            {contactInfo.length < 11 && contactInfo.length > 0 && (
              <small>Contact info must be 11 digits</small>
            )}
          </label>
          <label>
            Description:
            <textarea
              required
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </article>
    </dialog>
  )
}
