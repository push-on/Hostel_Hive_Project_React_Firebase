import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"

interface foodItem {
  id: string
  food_name: string
}
interface foodSubscription {
  id: string
}

export default function Food() {
  const [FoodItem, setFoodItem] = useState<foodItem[]>([])
  const [FoodSubs, setFoodSubs] = useState<foodSubscription[]>([])
  const [createRoomMode, setCreateRoomMode] = useState(false)
  const food_items = collection(db, "food_items")
  const food_subscriptions = collection(db, "food_subscriptions")

  const get_food_items = async () => {
    try {
      const data = await getDocs(food_items)
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodItem(foodData as foodItem[])
      console.log(FoodItem)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const get_food_subscriptions = async () => {
    try {
      const data = await getDocs(food_subscriptions)
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodSubs(foodData)
      console.log()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const deleteData = async (id: string) => {
    try {
      const docRef = doc(db, "food_items", id)
      await deleteDoc(docRef).then(() => {
        get_food_items()
        toast.success("Deleted Successfully")
      })
    } catch (error) {
      toast.error("you are not logged in")
    }
  }

  const getFoodNameById = (foodId: any) => {
    if (FoodItem) {
      const selectedFoodItem = FoodItem.find((item: any) => item.id === foodId)
      if (selectedFoodItem) {
        return selectedFoodItem?.food_name
      }
    }
    return "Food not found"
  }
  useEffect(() => {
    get_food_subscriptions()
    get_food_items()
  }, [])

  return (
    <div>
      <nav>
        <ul>
          <li>
            <h1>Food Management</h1>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={() => setCreateRoomMode(!createRoomMode)}>
              Create Food Item
            </button>
            {createRoomMode && (
              <CreateFoodItem
                createMode={setCreateRoomMode}
                updateData={get_food_items}
              />
            )}
          </li>
        </ul>
      </nav>
      <h2>Food Items</h2>
      <table>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {FoodItem &&
            FoodItem.map((item: any) => (
              <tr key={item?.id}>
                <td>{item?.food_name}</td>
                <td>{item?.description}</td>
                <td>{item?.price}</td>
                <td>{item?.availability ? "Available" : "Not Available"}</td>
                <td>
                  <button className="btn" onClick={() => deleteData(item?.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Food Subscriptions</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Food Item</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {FoodSubs.map((subscription: any) => (
            <tr key={subscription?.id}>
              <td>{subscription?.student_id.substring(0, 5)}</td>
              <td>{getFoodNameById(subscription?.food_item_id)}</td>
              <td>{subscription?.subscription_start_date}</td>
              <td>{subscription?.subscription_end_date}</td>
              <td>{subscription?.status ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CreateFoodItem({ updateData, createMode }: any) {
  const [foodName, setFoodName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [availability, setAvailability] = useState(false)
  const foodCollectionRef = collection(db, "food_items")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addDoc(foodCollectionRef, {
      food_name: foodName,
      description: description,
      price: price,
      availability: availability,
    })
      .then(() => {
        updateData()
        createMode(false)
        toast.success("Added Successfully")
      })
      .catch((error: any) => {
        toast.error(error.message)
      })
  }

  return (
    <div>
      <dialog open>
        <article>
          <hgroup>
            <h2>CREATE FOOD ITEM</h2>
            <p>Add a new food item to the database</p>
          </hgroup>
          <form>
            <label>Food Name</label>
            <input
              type="text"
              required
              onChange={(e) => setFoodName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              required
              onChange={(e) => setPrice(e.target.value)}
            />

            <fieldset>
              <legend>Availability</legend>
              <input
                type="radio"
                id="radio-1"
                name="radio"
                onChange={() => setAvailability(true)}
                value="radio-1"
              />
              <label htmlFor="radio-1">Yes</label>
              <input
                type="radio"
                id="radio-2"
                name="radio"
                onChange={() => setAvailability(false)}
                value="radio-2"
              />
              <label htmlFor="radio-2">No</label>
            </fieldset>

            <div className="grid">
              <button className="outline" onClick={handleSubmit}>
                Submit
              </button>
              <button
                className="outline secondary"
                onClick={() => createMode(false)}>
                Close
              </button>
            </div>
          </form>
        </article>
      </dialog>
    </div>
  )
}
