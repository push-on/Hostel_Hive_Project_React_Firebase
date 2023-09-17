import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../../config/firebase"
import toast from "react-hot-toast"
import { AuthContext } from "../../context/AuthContext"
import { motion } from "framer-motion"

export default function StudentsFood() {
	const [FoodItem, setFoodItem] = useState<any>()
	const food_items = collection(db, "food_items")
	const [selectedFood, setSelectedFood] = useState<string | null>(null)
	const { currentUser } = useContext(AuthContext)
	const [currentOrderData, setcurrentOrderData] = useState<any>(null)
	const [User, setUser] = useState<any>()

	const saveData = (data: any) => {
		localStorage.setItem("currentOrderData", JSON.stringify(data))
	}

	const ViewCurrentOrder = (id: string) => {
		getDoc(doc(db, "food_subscriptions", id))
			.then((docSnapshot) => {
				const data = docSnapshot.data()
				if (data) {
					data.id = docSnapshot.id // Add the ID to the data object
					setcurrentOrderData(data)
					saveData(data)
				} else {
					toast.error("No data found for the provided ID")
				}
			})
			.catch(() => {
				toast.error("failed to get current order")
			})
	}

	const OrderFood = (e: React.FormEvent) => {
		e.preventDefault()
		if (!User?.booked) {
			toast.error("User Is not booked.")
			return
		}
		
		if (!selectedFood) {
			toast.error("Please select a food item before placing your order.")
			return
		}
		const selectedFoodItem = FoodItem.find((item: any) => item.id === selectedFood)
		if (!selectedFoodItem || !selectedFoodItem.availability) {
			toast.error("Selected food is not available. Please choose an available food item.")
			return
		}
		addDoc(collection(db, "food_subscriptions"), {
			student_id: currentUser?.uid,
			food_item_id: selectedFoodItem?.id,
			subscription_start_date: "2023-08-01",
			subscription_end_date: "2023-08-31",
			status: true,
		}).then((document) => {
			toast.success("Order placed successfully.")
			ViewCurrentOrder(document.id)
		}).catch(error => {
			toast.error(error.message)
		})
	}

	const getFoodNameById = (foodId: any) => {
		if (FoodItem) {
			const selectedFoodItem = FoodItem.find((item: any) => item.id === foodId)
			if (selectedFoodItem) {
				return selectedFoodItem.food_name
			}
		}
		return "Food not found"
	}


	const getData = async () => {
		try {
			const data = await getDocs(food_items)
			const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			setFoodItem(foodData)
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const cancelOrder = async (e: React.FormEvent) => {
		e.preventDefault()
		const docRef = doc(db, "food_subscriptions", currentOrderData?.id)
		await deleteDoc(docRef).then(() => {
			toast.success("Order canceled successfully.")
			// Clear current order data from local storage
			localStorage.removeItem("currentOrderData")
			setcurrentOrderData(null)
		})
			.catch(() => {
				toast.error("Failed to cancel the order.")
			})

	}

	const getStudentData = () => {
		const uid = currentUser?.uid
		if (uid) {
			const documentRef = doc(db, "students", uid)
			getDoc(documentRef)
				.then((doc) => {
					setUser(doc.data())
				})
				.catch((error) => {
					toast.error("Error getting user data:", error)
				})
		} else {
			toast.error("UID Not Found")
		}
	}
	useEffect(() => {
		const storedOrderData = localStorage.getItem("currentOrderData")
		if (storedOrderData) {
			setcurrentOrderData(JSON.parse(storedOrderData))
		}
		getData()
		getStudentData()
	}, [])

	return (
		<div>
			{currentOrderData &&
				<motion.article
					initial={{ x: "100vw", opacity: 0 }}
					animate={{ x: "0vw", opacity: 1 }}
					exit={{ x: "-100vw", opacity: 0 }}
					transition={{ ease: "easeInOut", duration: 0.2 }}
				>
					<h2>Current Order</h2>
					<p><strong>Food Name:</strong> {getFoodNameById(currentOrderData?.food_item_id)}</p>
					<p><strong>Payment Status:</strong> {currentOrderData?.status ? "Complited" : "Pending"}</p>
					<p><strong>Sub Start Date:</strong> {currentOrderData?.subscription_start_date}</p>
					<p><strong>Sub End Date:</strong> {currentOrderData?.subscription_end_date}</p>
					<nav>
						<ul></ul>
						<button className="secondary" onClick={cancelOrder}>Cancel Current Order</button>
					</nav>
				</motion.article>
			}
			<nav>
				<ul>
					<li>
						<h1>Food Management</h1>
					</li>
				</ul>
				<ul>
					<li>
						<button onClick={OrderFood}>Order Selected Food</button>
					</li>
				</ul>
			</nav>
			<p><strong>Order Food:</strong> {selectedFood ? getFoodNameById(selectedFood) : "No Food Selected"}</p>
			<h2>Food Items</h2>
			<motion.table
				initial={{ x: "100vw", opacity: 0 }}
				animate={{ x: "0vw", opacity: 1 }}
				exit={{ x: "-100vw", opacity: 0 }}
				transition={{ ease: "easeInOut", duration: 0.2 }}
			>
				<thead>
					<tr>
						<th>ID.5</th>
						<th>Food Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Order</th>
					</tr>
				</thead>
				<tbody>
					{FoodItem &&
						FoodItem.map((item: any) => (
							<tr key={item.id}>
								<td>{item.id.substring(0, 5)}</td>
								<td>{item.food_name}</td>
								<td>{item.description}</td>
								<td>{item.price}</td>
								<td>{item.availability ? "Available" : "Not Available"}</td>
								<td>
									<input
										type="radio"
										name="foodSelection"
										value={item.id}
										checked={selectedFood === item.id}
										onChange={() => setSelectedFood(item.id)}
									/>
								</td>
							</tr>
						))}
				</tbody>
			</motion.table>
		</div>
	)
}