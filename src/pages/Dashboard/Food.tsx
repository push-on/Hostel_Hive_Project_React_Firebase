import { addDoc, collection, getDocs } from "firebase/firestore"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"

export default function Food() {
  const [foodItems, setFoodItems] = useState<any[]>([])
  const [foodSubs, setFoodSubs] = useState<any[]>([])
  const [modal, setModal] = useState(false)
  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "food_items"))
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodItems(foodData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getFoodSubs = async () => {
    try {
      const data = await getDocs(collection(db, "food_subscriptions"))
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodSubs(foodData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getData()
    getFoodSubs()
  }, [])
  return (
    <div className="container">
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <nav>
          <ul>
            <li>
              <h3>MONTHLY FOOD SUBSCRIPTION TYPES</h3>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={() => setModal(true)}>
                Add Food Subscription
              </button>
            </li>
          </ul>
        </nav>
        <dialog open={modal}>
          <AddFoodSubscription setModal={setModal} getData={getData} />
        </dialog>

        <table style={{ textTransform: "capitalize" }}>
          <thead>
            <tr style={{ textTransform: "capitalize" }}>
              <th>Name</th>
              <th>Lunch</th>
              <th>Description</th>
              <th>Special</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {foodItems?.map((option) => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}>
                <td>{option.type} </td>
                <td>{option.lunch}</td>
                <td>{option.description}</td>
                <td>{option?.special ? `${option.special}` : "none"}</td>
                <td>{option.price}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul>
            <li>
              <h3> SUBSCRIPTION USERS</h3>
            </li>
          </ul>
          <ul>
            <li></li>
          </ul>
        </nav>
        <table style={{ textTransform: "capitalize" }}>
          <thead>
            <tr style={{ textTransform: "capitalize" }}>
              <th>Selected Subscription:</th>
              <th>Message:</th>
              <th>Amount:</th>
              <th>Payment Status:</th>
              <th>Subscribed:</th>
            </tr>
          </thead>
          <tbody>
            {foodSubs?.map((option) => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}>
                <td>{option?.selected} </td>
                <td>{option?.description}</td>
                <td>{option?.price}</td>
                <td>{option?.payment}</td>
                <td>{option?.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

function AddFoodSubscription({ setModal, getData }: any) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    await addDoc(collection(db, "food_items"), {
      type: data.get("name"),
      lunch: data.get("lunch"),
      description: data.get("description"),
      special: data.get("special"),
      price: data.get("price"),
    })
      .then(() => {
        toast.success("Added Successfully")
        getData()
      })
      .catch((error) => {
        toast.error(error.message)
      })

    setModal(false)
  }

  return (
    <article>
      <button className="close contrast " onClick={() => setModal(false)} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input name="name" type="text" required placeholder="Name" />
        <label htmlFor="">Lunch</label>
        <input name="lunch" type="text" required placeholder="Lunch" />
        <label htmlFor="">Description</label>
        <input
          name="description"
          type="text"
          required
          placeholder="Description"
        />
        <label htmlFor="">Special</label>
        <input name="special" type="text" required placeholder="Special" />
        <label htmlFor="">Price</label>
        <input name="price" type="text" required placeholder="Price" />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}
