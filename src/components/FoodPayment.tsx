import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { db } from "../config/firebase"
import { AuthContext } from "../context/AuthContext"

export default function FoodPayment({ setModal, selected }: any) {
  const [Payments, setPayments] = useState<any>()
  const [description, setDescription] = useState("")
  const { currentUser } = useContext(AuthContext)

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentUser?.uid) {
      setDoc(doc(collection(db, "food_subscriptions"), currentUser?.uid), {
        meal: selected,
        userID: currentUser?.uid,
        paymentStatus: "pending",
        description: description,
        time: new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      })
        .then(() => {
          toast.success("Payment is being Processed")
          setModal(false)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
  }
  useEffect(() => {
    getInstructionData()
  }, [])
  return (
    <dialog open>
      <article>
        <button
          className="close outline contrast"
          onClick={() => {
            setModal(false)
          }}></button>
        <h1>Pay & Order Meal</h1>
        <h3>Selected Meal: {selected} </h3>
        <p>
          <strong>Title:</strong> {Payments?.title}
        </p>
        <p>
          <strong>Instructions:</strong> {Payments?.description}
        </p>
        <form onSubmit={handleSubmit}>
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
