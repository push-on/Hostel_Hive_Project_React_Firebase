import { collection, getDocs } from "firebase/firestore"
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
	const food_items = collection(db, "food_items")
	const food_subscriptions = collection(db, "food_subscriptions")

	const get_food_items = async () => {
		try {
			const data = await getDocs(food_items)
			const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			setFoodItem(foodData as foodItem[])
			console.log(FoodItem);
			
		} catch (error: any) {
			toast.error(error.message)
		}
	}
	const get_food_subscriptions = async () => {
		try {
			const data = await getDocs(food_subscriptions)
			const foodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			setFoodSubs(foodData)
			console.log();
			
		} catch (error: any) {
			toast.error(error.message)
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
						<button >Create Food Item</button>
					</li>
					<li>
						<button >Assign Food</button>
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
						<th>Edit</th>
						<th>Delete</th>
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
							<td>
								<button className="btn" >
									Edit
								</button>
							</td>
							<td>
								<button className="btn" >
									Delete
								</button>
							</td>
						</tr>
					))}

				</tbody>
			</table>
		</div>
	)
}

