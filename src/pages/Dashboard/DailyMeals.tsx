import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { db } from "../../config/firebase"

export default function DailyMeals() {
  const [foodItems, setFoodItems] = useState<any[]>()

  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "food_items"))
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodItems(foodData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <nav>
        <ul>
          <li>
            <h3>Daily Meals</h3>
          </li>
        </ul>
        <ul>
          <li>
            <button>SUBMIT MEAL</button>
          </li>
        </ul>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Day Time</th>
            <th>Meal Item</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Breakfast</td>
            <td>
              <select>
                {foodItems?.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </td>
            <td>
              <input type="time" />
            </td>
            <td>
              <input type="time" />
            </td>
          </tr>
          <tr>
            <td>Lunch</td>
            <td>
              <select>
                {foodItems?.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </td>
            <td>
              <input type="time" />
            </td>
            <td>
              <input type="time" />
            </td>
          </tr>
          <tr>
            <td>Dinner</td>
            <td>
              <select>
                {foodItems?.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </td>
            <td>
              <input type="time" />
            </td>
            <td>
              <input type="time" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
