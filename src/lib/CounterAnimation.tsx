import { useEffect, useState } from "react"

interface CountingAnimationProps {
	value: number
}

const duration = 300
const from = 0

export const CountingAnimation: React.FC<CountingAnimationProps> = ({ value }) => {
	const [count, setCount] = useState<number>(value)

	useEffect(() => {
		const startTime = Date.now()
		const interval = setInterval(() => {
			const currentTime = Date.now()
			const elapsedTime = currentTime - startTime

			if (elapsedTime < duration) {
				const progress = (elapsedTime / duration) * (value - from)
				setCount(from + progress)
			} else {
				setCount(value)
				clearInterval(interval)
			}
		}, 16)

		return () => clearInterval(interval)
	}, [from, value, duration])

	return <span>{Math.floor(count)}</span>
}