import { useState, useEffect } from "react"
// import { toast } from "react-hot-toast"

const dummyFoodData = [
	{
		id: "1",
		food_name: "Rice",
		description: "Steamed rice",
		price: "৳20",
		availability: true,
	},
	{
		id: "2",
		food_name: "Fish Curry",
		description: "Delicious fish curry",
		price: "৳50",
		availability: true,
	},
	{
		id: "3",
		food_name: "Biriyani",
		description: "Spicy biriyani",
		price: "৳80",
		availability: true,
	},
]

const dummyFoodSubscriptionData = [
	{
		id: "1",
		student_id: "1",
		food_item_id: "1",
		subscription_start_date: "2023-08-01",
		subscription_end_date: "2023-08-31",
		status: "active",
	},
	{
		id: "2",
		student_id: "2",
		food_item_id: "2",
		subscription_start_date: "2023-08-01",
		subscription_end_date: "2023-08-31",
		status: "active",
	},
	// Add more food subscriptions here
]

export default function Food() {
	const [foodItems, setFoodItems] = useState(dummyFoodData)
	const [foodSubscriptions, setFoodSubscriptions] = useState(dummyFoodSubscriptionData)
	const [createFoodItemMode, setCreateFoodItemMode] = useState(false)
	const [createFoodSubscriptionMode, setCreateFoodSubscriptionMode] = useState(false)

	useEffect(() => {
		setFoodItems(dummyFoodData)
		setFoodSubscriptions(dummyFoodSubscriptionData)

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
						<button onClick={() => setCreateFoodItemMode(!createFoodItemMode)}>Create Food Item</button>
						{/* {createFoodItemMode ? <CreateFoodItem /> : ""} */}
					</li>
					<li>
						<button onClick={() => setCreateFoodSubscriptionMode(!createFoodSubscriptionMode)}>Assign Food</button>
						{/* {createFoodSubscriptionMode ? <CreateFoodSubscription /> : ""} */}
					</li>
				</ul>
			</nav>
			<h2>Food Items</h2>
			<table>
				<thead>
					<tr>
						<th>Food Name</th>
						<th>Description</th>
						<th>Price (৳)</th>
						<th>Availability</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{foodItems.map((foodItem) => (
						<tr key={foodItem.id}>
							<td>{foodItem.food_name}</td>
							<td>{foodItem.description}</td>
							<td>{foodItem.price}</td>
							<td>{foodItem.availability ? "Available" : "Out of Stock"}</td>
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
					{foodSubscriptions.map((subscription) => (
						<tr key={subscription.id}>
							<td>{subscription.student_id}</td>
							<td>{/* Display food item name here */}</td>
							<td>{subscription.subscription_start_date}</td>
							<td>{subscription.subscription_end_date}</td>
							<td>{subscription.status}</td>
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
