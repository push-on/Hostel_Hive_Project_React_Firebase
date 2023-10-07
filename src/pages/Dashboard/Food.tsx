import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { db } from "../../config/firebase"

export default function Food() {
  const [foodItems, setFoodItems] = useState<any[]>([])
  const [foodForm, setFoodForm] = useState({ name: "", price: 0, status: true })
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selected, setSelected] = useState()

  const getData = async () => {
    try {
      const data = await getDocs(collection(db, "food_items"))
      const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setFoodItems(foodData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const deleteData = async (id: string) => {
    try {
      const docRef = doc(db, "food_items", id)
      await deleteDoc(docRef).then(() => {
        getData()
        toast.success("Deleted Successfully")
      })
    } catch (error) {
      toast.error("you are not logged in")
    }
  }

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    try {
      const { name, value } = event.target
      setFoodForm((prev) => ({ ...prev, [name]: value }))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
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
              <h3>FOOD ITEMS</h3>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={() => setModal(true)}>Add FOOD ITEMS</button>
            </li>
          </ul>
        </nav>
        {modal && (
          <dialog open={modal}>
            <AddFoodItem
              setModal={setModal}
              getData={getData}
              food={foodForm}
              onChange={handleOnChange}
              setFoodForm={setFoodForm}
            />
          </dialog>
        )}
        {editModal && (
          <dialog open={editModal}>
            <EditFoodItem
              setModal={setEditModal}
              getData={getData}
              id={selected}
              food={foodForm}
              onChange={handleOnChange}
              setFood={setFoodForm}
            />
          </dialog>
        )}

        <table style={{ textTransform: "capitalize" }}>
          <thead>
            <tr style={{ textTransform: "capitalize" }}>
              <th>Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {foodItems?.map((option) => (
              <motion.tr
                key={option.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}>
                <td>{option?.name} </td>
                <td>{option?.status === true ? "Active" : "Inactive"}</td>
                <td>{option?.price}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      setSelected(option?.id)
                      setEditModal(true)
                    }}>
                    <AiOutlineEdit />
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => deleteData(option.id)}>
                    <AiOutlineClose />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

function AddFoodItem({ setModal, getData, food, setFoodForm, onChange }: any) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addDoc(collection(db, "food_items"), food)
      .then(() => {
        toast.success("Added Successfully")
        setFoodForm({ name: "", price: 0, status: true })
        getData()
        setModal(false)
      })
      .catch((error) => {
        toast.error(error.message)
        setModal(false)
      })
  }

  return (
    <article>
      <button
        className="close contrast "
        onClick={() => {
          setFoodForm({ name: "", price: 0, status: true })
          setModal(false)
        }}
      />
      <h1>Add Food Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Food Item Name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="name"
          value={food.name}
          onChange={onChange}
        />
        <label>status</label>
        <select name="status" required value={food.status} onChange={onChange}>
          <option value={"true"}>Available</option>
          <option value={"false"}>N/A</option>
        </select>
        <label>Price</label>
        <input
          name="price"
          type="text"
          required
          placeholder="Price"
          value={food.price}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}

function EditFoodItem({ setModal, id, getData, food, setFood, onChange }: any) {
  const getFoodById = () => {
    try {
      getDoc(doc(db, "food_items", id))
        .then((doc) => {
          setFood(doc.data())
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateDoc(doc(db, "food_items", id), food)
      .then(() => {
        toast.success("Added Successfully")
        setFood({ name: "", price: 0, status: true })
        getData()
        setModal(false)
      })
      .catch((error) => {
        toast.error(error.message)
        setModal(false)
      })
  }

  useEffect(() => {
    getFoodById()
  }, [])

  return (
    <article>
      <h1>Update Food Item</h1>
      <button
        className="close contrast "
        onClick={() => {
          setFood({ name: "", price: 0, status: true })
          setModal(false)
        }}
      />
      <form onSubmit={handleSubmit}>
        <label>Food Item Name</label>
        <input
          name="name"
          type="text"
          required
          value={food.name}
          onChange={onChange}
        />
        <label>status</label>
        <select name="status" required value={food.status} onChange={onChange}>
          <option value={"true"}>Available</option>
          <option value={"false"}>N/A</option>
        </select>
        <label>Price</label>
        <input
          name="price"
          type="text"
          required
          value={food.price}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}
