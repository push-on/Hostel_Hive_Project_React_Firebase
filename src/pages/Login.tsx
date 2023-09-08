import { useContext, useState } from 'react'
import { auth, db, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'

export default function Login({ isState, setState }: { isState: string, setState: Function }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { currentUser } = useContext(AuthContext)

	const { dispatch } = useContext(AuthContext)

	const signInWithGoogle = async (e: React.FormEvent) => {
		e.preventDefault()
		await signInWithPopup(auth, googleProvider).then((userCredentials) => {
			const user = userCredentials.user
			getDoc(doc(db, "users", user.uid)).then((doc) => {
				if (isState === doc.data()?.role) {
					dispatch({ type: 'LOGIN', payload: user })
					toast.success("Role Matched & login successful")
					setTimeout(() => {
						navigate('/dashboard')
					}, 600)
				} else {
					toast.error("Role didn't Match")
				}
			}).catch((error: any) => {
				toast.error(error.message)
			})
		}).catch((error: any) => {
			toast.error(error.message)
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
			const user = userCredentials.user
			getDoc(doc(db, "users", user.uid)).then((doc) => {
				if (isState === doc.data()?.role) {
					toast.success("role Matched ")
					dispatch({ type: 'LOGIN', payload: user })
					toast.success("login successful")
					setTimeout(() => {
						navigate('/dashboard')
					}, 600)
				} else {
					toast.error("role not matched")
				}
			}).catch((error: any) => {
				toast.error(error.message)
			})
		}).catch(() => {
			toast.error("Invalid email or password")
		})
	}

	return (
		<div className='container'>
			<dialog open>
				<Toaster />
				<motion.article
					initial={{ opacity: 0, y: '-100%' }}
					animate={{ opacity: 1, y: '0%' }}
					exit={{ opacity: 0, y: '-100%' }}
					transition={{ ease: 'easeInOut', duration: 0.5 }}
				>
					{currentUser !== null ? (
						<Link className='close' to='/dashboard'></Link>
					) : (
						<Link className='close' to='/'></Link>
					)}
					<hgroup>
						<h2>Login</h2>
						<p>Login to your account </p>
					</hgroup>
					<UserSlector isState={isState} setState={setState} />
					<form onSubmit={handleSubmit}>
						<label htmlFor="email" >Email:</label>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@email.com' />
						<label htmlFor="password">Password:</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='********' />
						<div role='group' className='' style={{ width: '100%' }}>
							<button className='outline' type='submit' >Login with Email</button>
							<button className='outline' onClick={signInWithGoogle}>Login with Google</button>
						</div>
					</form>
					<footer>
						<p>Don't Have an Account ? <Link to='/signup'>Signup</Link></p>
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
			<button className={`outline ${isState === "admin" ? "" : "secondary"}`}
				onClick={() => { setState("admin") }}
			>
				Admin
			</button>
		</div>
	)
}