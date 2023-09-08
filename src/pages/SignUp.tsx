import { useState } from 'react'
import { auth, db, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { collection, doc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'


export default function SignUp() {
	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const [isState, setState] = useState("student")

	const studentsCollection = collection(db, "students")
	const usersCollection = collection(db, "users")

	const createRole = async (id: string, userRole: string | null) => {
		await setDoc(doc(usersCollection, id), {
			role: userRole,
			userID: id
		}).catch(error => {
			toast.error(error.message)
		})
	}


	const createUser = async (id: string, name: string | null, useremail: string | null) => {
		await setDoc(doc(studentsCollection, id), {
			student_name: name === null ? "" : name,
			student_email: useremail,
			hostel_floor: "",
			hostel_room: "",
			booked: false,
			created_at: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
			userID: id
		}).catch(error => {
			toast.error(error.message)
		})
	}

	const signInWithGoogle = async (e: React.FormEvent) => {
		e.preventDefault()
		await signInWithPopup(auth, googleProvider)
			.then((userCredentials) => {
				const user = userCredentials.user
				createUser(user?.uid, user?.displayName, user?.email)
				createRole(user?.uid, isState)
				setTimeout(() => {
					navigate('/login')
				}, 600)
			}).catch((error: any) => {
				toast.error(error.message)
			})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user
				createUser(user?.uid, fullName, user?.email)
				createRole(user?.uid, isState)
				toast.success("signedup")
				setTimeout(() => {
					navigate('/login')
				}, 1000)
			}).catch((error: any) => {
				toast.error(error.message)
			})
	}

	return (
		<div className='container'>
			<dialog open >
				<Toaster />
				<motion.article
					initial={{ opacity: 0, y: '-100%' }}
					animate={{ opacity: 1, y: '0%' }}
					exit={{ opacity: 0, y: '-100%' }}
					transition={{ ease: 'easeInOut', duration: 0.5 }}
				>
					<Link className='close' to='/'></Link>
					<hgroup>
						<h2>Signup</h2>
						<p>Create a new account</p>
					</hgroup>
					<UserSlector isState={isState} setState={setState} />
					<form onSubmit={handleSubmit}>
						<label >Full Name:</label>
						<input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder='user name' />
						<label htmlFor="email">Email:</label>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@email.com' />
						<label htmlFor="password">Password:</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='********' />
						<div role='group' className='' style={{ width: '100%' }}>
							<button type='submit' className='outline'>Sign-up with Email</button>
							<button onClick={signInWithGoogle} className='outline'>Sign-up with Google</button>
						</div>
					</form>
					<footer>
						<p>Already Have an Account ? <Link to='/login'>Login</Link></p>
					</footer>
				</motion.article>
			</dialog>
		</div>
	)
}

function UserSlector({ isState, setState }: { isState: string, setState: Function }) {
	return (
		<div role="group" style={{ width: '100%' }}>
			<button
				className={`outline ${isState === "student" ? "" : "secondary"}`}
				onClick={() => { setState("student") }}
			>
				Student
			</button>
			<button className={`outline ${isState === "staff" ? "" : "secondary"}`}
				onClick={() => { setState("staff") }}
			>
				Staff
			</button>
		</div>
	)
}