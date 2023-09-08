import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StudentData {
	total: number
	male: number
	female: number
	bookedRooms: number
}

interface RoomData {
	total: number
}

interface PaymentData {
	total: number
}

interface DummyData {
	students: StudentData
	rooms: RoomData
	payments: PaymentData
}

interface CountingAnimationProps {
	from: number
	to: number
	duration: number
}

export default function Overview() {
	const dummyData: DummyData = {
		students: {
			total: 10,
			male: 6,
			female: 4,
			bookedRooms: 15,
		},
		rooms: {
			total: 20,
		},
		payments: {
			total: 30,
		},
	}

	const [counting, setCounting] = useState<boolean>(false)

	const startCounting = () => {
		setCounting(true)
	}

	useEffect(() => {
		startCounting()
	}, [])

	return (
		<motion.div
			initial={{ x: '100vw', opacity: 0 }}
			animate={{ x: '0vw', opacity: 1 }}
			exit={{ x: '-100vw', opacity: 0 }}
			transition={{ ease: 'easeInOut', duration: 0.2 }}
		>			<header>
				<h1>Overview</h1>
			</header>
			<div className="grid">

				<article>
					<h3 className="nowrap overflow">Student Information</h3>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Students: {counting ? (
							<CountingAnimation from={0} to={dummyData.students.total} duration={2000} />
						) : (
							<span>0</span>
						)}</h4>
					</div>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}> Male Students: {counting ? (
							<CountingAnimation from={0} to={dummyData.students.male} duration={2000} />
						) : (
							<span>0</span>
						)}</h4>
					</div>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Female Students: {counting ? (
							<CountingAnimation from={0} to={dummyData.students.female} duration={2000} />
						) : (
							<span>0</span>
						)}</h4>
					</div>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Booked Rooms: {counting ? (
							<CountingAnimation from={0} to={dummyData.students.bookedRooms} duration={2000} />
						) : (
							<span>0</span>
						)}</h4>
					</div>
				</article>
				<article>
					<h3 className="nowrap overflow">Room Information</h3>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Rooms: {counting ? (
							<CountingAnimation from={0} to={dummyData.rooms.total} duration={2000} />
						) : (
							<span>0</span>
						)}</h4>
					</div>
				</article>
				<article>
					<h3 className="nowrap overflow">Payment Information</h3>
					<div className="count">
						<h4 className="nowrap overflow" style={{ margin: "0", padding: "0" }}>Total Payments: {counting ? (
							<CountingAnimation from={0} to={dummyData.payments.total} duration={2000} />
						) : (
							<span>0</span>
						)}</h4>
					</div>
				</article>
			</div>
		</motion.div>
	)
}

const CountingAnimation: React.FC<CountingAnimationProps> = ({ from, to, duration }) => {
	const [count, setCount] = useState<number>(from)

	useEffect(() => {
		const startTime = Date.now()
		const interval = setInterval(() => {
			const currentTime = Date.now()
			const elapsedTime = currentTime - startTime

			if (elapsedTime < duration) {
				const progress = (elapsedTime / duration) * (to - from)
				setCount(from + progress)
			} else {
				setCount(to)
				clearInterval(interval)
			}
		}, 16)

		return () => clearInterval(interval)
	}, [from, to, duration])

	return <span>{Math.floor(count)}</span>
}
