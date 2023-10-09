import { collection, getDocs, addDoc, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { db } from "../../config/firebase"

export default function DailyMeals() {
  const [foodItems, setFoodItems] = useState<any[]>()
  const [selectedFood, setSelectedFood] = useState<string[][]>([])
  const [mealTimes, setMealTimes] = useState<any[]>([
    { time: "Breakfast", from: "", to: "" },
    { time: "Lunch", from: "", to: "" },
    { time: "Dinner", from: "", to: "" },
  ])
  const [currentMeals, setCurrentMeals] = useState<any[]>([])

  const getData = async () => {
    try {
      const foodData = await getDocs(collection(db, "food_items"))
      setFoodItems(foodData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

      // Fetch current meals from Firestore
      const mealsQuery = query(collection(db, "meals"))
      const mealSnapshot = await getDocs(mealsQuery)
      setCurrentMeals(mealSnapshot.docs.map((doc) => doc.data()))
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const submitMeal = async () => {
    try {
      const mealData = mealTimes.map((meal, index) => ({
        time: meal.time,
        foodItems: selectedFood[index] || [], // Use selectedFood[index] or an empty array
        from: meal.from,
        to: meal.to,
      }))

      await addDoc(collection(db, "meals"), {
        meals: mealData,
      })

      toast.success("Meal submitted successfully!")

      setSelectedFood([])
      setMealTimes([
        { time: "Breakfast", from: "", to: "" },
        { time: "Lunch", from: "", to: "" },
        { time: "Dinner", from: "", to: "" },
      ])

      // Refresh the current meals data after submission
      getData()
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
            <button onClick={submitMeal}>SUBMIT MEAL</button>
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
          {mealTimes.map((meal, index) => (
            <tr key={meal.time}>
              <td>{meal.time}</td>
              <td>
                <details className="dropdown">
                  <summary>Select meal items...</summary>
                  <ul>
                    {foodItems &&
                      foodItems.map((item) => (
                        <li key={item.id}>
                          <label>
                            <input
                              type="checkbox"
                              value={item.name}
                              checked={selectedFood[index]?.includes(item.name)}
                              onChange={(e) => {
                                const isChecked = e.target.checked
                                setSelectedFood((prevSelectedFood) => {
                                  const newSelectedFood = [...prevSelectedFood]
                                  if (!newSelectedFood[index]) {
                                    newSelectedFood[index] = []
                                  }
                                  if (
                                    isChecked &&
                                    !newSelectedFood[index].includes(item.name)
                                  ) {
                                    newSelectedFood[index].push(item.name)
                                  } else if (!isChecked) {
                                    const itemIndex = newSelectedFood[
                                      index
                                    ].indexOf(item.name)
                                    if (itemIndex !== -1) {
                                      newSelectedFood[index].splice(
                                        itemIndex,
                                        1
                                      )
                                    }
                                  }
                                  return newSelectedFood
                                })
                              }}
                            />

                            {item.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                </details>
              </td>
              <td>
                <input
                  type="time"
                  value={meal.from}
                  onChange={(e) => {
                    const newMealTimes = [...mealTimes]
                    newMealTimes[index].from = e.target.value
                    setMealTimes(newMealTimes)
                  }}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={meal.to}
                  onChange={(e) => {
                    const newMealTimes = [...mealTimes]
                    newMealTimes[index].to = e.target.value
                    setMealTimes(newMealTimes)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Current Meals</h2>
      <table>
        <thead>
          <tr>
            <th>Day Time</th>
            <th>Meal Items</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {currentMeals?.map((mealData, index) =>
            mealData?.meals?.map((meal: any, mealIndex: any) => (
              <tr key={`${index}_${mealIndex}`}>
                <td>{meal?.time}</td>
                <td>{meal?.foodItems?.join(", ")}</td>
                <td>{meal?.from}</td>
                <td>{meal?.to}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
