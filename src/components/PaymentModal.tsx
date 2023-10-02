import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { motion } from "framer-motion"

export default function PaymentModal({ setModal, id }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("submitted")
  }
  const [selectedRoom, setSelectedRoom] = useState<any>()

  async function getData() {
    const docs = await getDoc(doc(db, "room_types", id))
    setSelectedRoom(docs.data())
  }

  useEffect(() => {
    if (id !== "") {
      getData()
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
        <h1>Payment Info</h1>
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
        <form onSubmit={handleSubmit}>
          <label>
            Contact Info
            <input type="text" />
          </label>
          <label>
            description:
            <textarea></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </article>
    </dialog>
  )
}
