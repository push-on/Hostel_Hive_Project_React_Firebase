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

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState<any>()

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
    }
    if (paymentStatus === "paid") {
      getDoc(doc(db, "food_items", id)).then((doc) => {
        setSelected(doc.data())
        setModal(true)
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
              <button
                className="contrast"
                onClick={() => handleFoodSub(option.id)}>
                Select
              </button>
            </motion.article>
          ))}
        </article>
      </motion.div>
      <Footer />
    </div>
  )
}

function FoodSub({ setModal, selected, instructions }: any) {
  const { currentUser } = useContext(AuthContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentUser?.uid) {
      await setDoc(
        doc(collection(db, "food_subscriptions"), currentUser?.uid),
        {
          mail: currentUser?.email,
          userID: currentUser?.uid,
          selected: selected?.type,
          price: selected?.price,
        }
      )
        .then(() => {
          toast.success("Payment is being Processed")
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
        <button onClick={handleSubmit}>Conform</button>
      </article>
    </>
  )
}
