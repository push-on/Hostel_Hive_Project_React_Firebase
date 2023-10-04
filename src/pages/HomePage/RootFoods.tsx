import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast, { Toaster } from "react-hot-toast"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function RootFoods() {
  const [foodItems, setFoodItems] = useState<any[]>([])
  const { currentUser, paymentStatus } = useContext(AuthContext)
  const [Payments, setPayments] = useState<any>()
  const [status, setStatus] = useState<any>()
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState<any>()
  const [selectedId, setSelectedId] = useState("")
  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "food_items"))
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodItems(foodData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleFoodSub = (id: string) => {
    if (currentUser === null) {
      navigate("/login", { state: { from: "/foods" } })
      return
    }
    if (paymentStatus === "unpaid" || paymentStatus === "pending") {
      toast("User Need to be booked first")
      return
    }
    if (status?.payment === "paid" || status?.payment === "pending") {
      toast.error("Already Subscribed")
      return
    }
    if (paymentStatus === "paid") {
      getDoc(doc(db, "food_items", id)).then((doc) => {
        setSelected(doc.data())
        setSelectedId(id)
        setModal(true)
      })
    }
  }
  const getFoodSubscription = async () => {
    const uid = currentUser?.uid
    if (uid) {
      getDoc(doc(db, "food_subscriptions", uid))
        .then((doc) => {
          setStatus(doc.data())
        })
        .catch((error) => {
          toast.error("Error getting user data:", error)
        })
    }
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
    getData()
    getInstructionData()
    getFoodSubscription()
  }, [])
  return (
    <div className="container">
      <NavBar />
      <Toaster />
      <dialog open={modal}>
        <FoodSub
          setModal={setModal}
          selected={selected}
          instructions={Payments}
          id={selectedId}
          status={status}
        />
      </dialog>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <article>
          <header>
            <h1 style={{ textAlign: "center" }}>MONTHLY FOOD SUBSCRIPTION</h1>
          </header>
          {foodItems?.map((option) => (
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
              style={{ textTransform: "capitalize" }}
              key={option.id}>
              <h2>{option.type}</h2>
              <p>Lunch: {option.lunch}</p>
              <p>Dinner: {option.lunch}</p>
              <p>Description: {option.description}</p>
              <p> {option?.special ? `Special: ${option.special}` : ""}</p>
              <p>Price: {option.price}</p>
              {status?.selected_ID === option.id ? (
                <strong>Already Booked</strong>
              ) : (
                <button
                  className="contrast"
                  onClick={() => handleFoodSub(option.id)}>
                  Select
                </button>
              )}
            </motion.article>
          ))}
        </article>
      </motion.div>
      <Footer />
    </div>
  )
}

function FoodSub({ setModal, selected, instructions, id }: any) {
  const { currentUser } = useContext(AuthContext)
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (description.length < 5) {
      toast.error("Description must be at least 5 characters")
      return
    }

    if (currentUser?.uid) {
      await setDoc(
        doc(collection(db, "food_subscriptions"), currentUser?.uid),
        {
          mail: currentUser?.email,
          userID: currentUser?.uid,
          selected_ID: id,
          selected: selected?.type,
          price: selected?.price,
          description: description,
          payment: "pending",
          date: new Date().toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
        }
      )
        .then(() => {
          toast.success("Payment is being Processed")
          setModal(false)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
  }
  return (
    <>
      <article>
        <button className="contrast close" onClick={() => setModal(false)} />
        <h1>Complete Your Payment</h1>
        <p>
          <strong>Title:</strong> {instructions?.title}
        </p>
        <p>
          <strong>Instructions:</strong> {instructions?.description}
        </p>
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
              <td>{selected?.type} Room</td>
              <td>{selected?.price} TK</td>
            </motion.tr>
          </tbody>
        </table>
        <form action="" onSubmit={handleSubmit}></form>
        <label>
          Description:
          <textarea
            required
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </label>
      </article>
    </>
  )
}
