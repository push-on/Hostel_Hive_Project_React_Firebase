import { useState, useEffect } from 'react'

export default function StaffSchedule() {
	// Define the state variable for the schedule data
	const [schedule, setSchedule] = useState<any>([])

	// Define some dummy data for the schedule
	const dummyData = [
		{
			date: '2023-09-28',
			shift: 'Morning',
			task: 'Check-in guests',
		},
		{
			date: '2023-09-29',
			shift: 'Afternoon',
			task: 'Clean rooms',
		},
		{
			date: '2023-09-30',
			shift: 'Evening',
			task: 'Prepare meals',
		},
	]

	// Set the schedule state with the dummy data when the component mounts
	useEffect(() => {
		setSchedule(dummyData)
	}, [])

	return (
		<div>
			<h1>Staff Schedule</h1>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Shift</th>
						<th>Task</th>
					</tr>
				</thead>
				<tbody>
					{schedule.map((item: any, index: any) => (
						<tr key={index}>
							<td>{item.date}</td>
							<td>{item.shift}</td>
							<td>{item.task}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
