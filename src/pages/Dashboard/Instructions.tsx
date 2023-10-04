import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"

export default function Instructions() {
  const [Payments, setPayments] = useState<any>()
  const id = "jnKliUnfxK9HVWsgAa4x"

  const getData = async () => {
    try {
      getDoc(doc(db, "instructions", id))
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    try {
      updateDoc(doc(db, "instructions", id), {
        title: data.get("title"),
        description: data.get("description"),
      })
        .then(() => {
          toast.success("Updated Successfully")
          getData()
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <article className="grid">
        <article style={{ textTransform: "capitalize" }}>
          <h1>Payment Instructions</h1>
          <p>
            <strong>Title:</strong> {Payments?.title}
          </p>
          <p>
            <strong>Description:</strong> {Payments?.description}
          </p>
        </article>
        <article>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">Title</label>
            <input type="text" name="title" />
            <label htmlFor="">Description</label>
            <input type="text" name="description" />
            <input
              type="submit"
              value="Submit"
              className="outline  secondary"
            />
          </form>
        </article>
      </article>
    </div>
  )
}
