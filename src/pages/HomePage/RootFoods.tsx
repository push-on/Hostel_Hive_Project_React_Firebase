import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast, { Toaster } from "react-hot-toast"

export default function RootFoods() {
  const [foodItems, setFoodItems] = useState<any[]>([])
  const [meals, setMeals] = useState<any[]>([])

  const getData = async () => {
    try {
      const foodData = await getDocs(collection(db, "food_items"))
      setFoodItems(foodData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

      const mealsDoc = await getDoc(doc(db, "meals", "F3fGT38g69ANibNxqTY2"))
      if (mealsDoc.exists()) {
        setMeals(mealsDoc.data().meals || [])
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container">
      <NavBar />
      <Toaster />
      <motion.article
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <article>
          <header>
            <hgroup style={{ textAlign: "center" }}>
              <h1>Meals</h1>
              <p>Hostel Hive food service</p>
            </hgroup>
          </header>
          <h2>Food Menu</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {foodItems?.map((foodItem) => (
                <tr key={foodItem.id}>
                  <td>{foodItem.name}</td>
                  <td>
                    {foodItem.status === true ? "Available" : "Not Available"}
                  </td>
                  <td>{foodItem.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article>
          <h3>Meal Schedule</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Food Items</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {meals?.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.time}</td>
                  <td>{meal.foodItems.join(", ")}</td>
                  <td>{meal.from}</td>
                  <td>{meal.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </motion.article>
      <Footer />
    </div>
  )
}
