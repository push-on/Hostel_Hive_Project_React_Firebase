import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai"

export default function Food() {
  const [foodItems, setFoodItems] = useState<any[]>([])
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
        <dialog open={modal}>
          <AddFoodItem setModal={setModal} getData={getData} />
        </dialog>
        <dialog open={editModal}>
          <EditFoodItem
            setModal={setEditModal}
            getData={getData}
            id={selected}
          />
        </dialog>

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

function AddFoodItem({ setModal, getData }: any) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)

    await addDoc(collection(db, "food_items"), {
      name: data.get("name"),
      status: Boolean(data.get("status")),
      price: data.get("price"),
    })
      .then(() => {
        toast.success("Added Successfully")
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
      <button className="close contrast " onClick={() => setModal(false)} />
      <h1>Add Food Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Food Item Name</label>
        <input name="name" type="text" required placeholder="name" />
        <label>status</label>
        <select name="status" required>
          <option>true</option>
          <option selected>false</option>
        </select>
        <label>Price</label>
        <input name="price" type="text" required placeholder="Price" />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}

function EditFoodItem({ setModal, id, getData }: any) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)

    await updateDoc(doc(db, "food_items", id), {
      name: data.get("name"),
      status: Boolean(data.get("status")),
      price: data.get("price"),
    })
      .then(() => {
        toast.success("Added Successfully")
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
      <h1>Update Food Item</h1>
      <button className="close contrast " onClick={() => setModal(false)} />
      <form onSubmit={handleSubmit}>
        <label>Food Item Name</label>
        <input name="name" type="text" required />
        <label>status</label>
        <select name="status" required>
          <option>true</option>
          <option>false</option>
        </select>
        <label>Price</label>
        <input name="price" type="text" required />
        <button type="submit">Submit</button>
      </form>
    </article>
  )
}
