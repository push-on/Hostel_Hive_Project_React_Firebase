import { useContext, useState } from 'react'
import { auth, db, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { FcGoogle } from 'react-icons/fc'
import { MdEmail } from 'react-icons/md'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { currentUser, dispatch } = useContext(AuthContext)

	function navigateTo(role: string) {
		switch (role) {
			case "admin":
				navigate('/dashboard')
				break
			case "staff":
				navigate('/staff')
				break
			case "student":
				navigate('/student')
				break
			default:
				navigate('/')
				break
		}

	}

	const signInWithGoogle = (e: React.FormEvent) => {
		e.preventDefault()
		toast.promise(
			signInWithPopup(auth, googleProvider).then((userCredentials) => {
				const user = userCredentials.user
				getDoc(doc(db, "users", user.uid)).then((doc) => {
					dispatch({ type: 'LOGIN', payload: user, role: doc.data()?.role })
					navigateTo(doc.data()?.role)
				})
			}), {
			loading: 'Login...',
			success: <b>Login successful!</b>,
			error: <b>Login failed.</b>,
		}
		)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		toast.promise(
			signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
				const user = userCredentials.user
				getDoc(doc(db, "users", user.uid)).then((doc) => {
					dispatch({ type: 'LOGIN', payload: user, role: doc.data()?.role })
					navigateTo(doc.data()?.role)
				}).catch((error: any) => {
					toast.error(error.message)
				})
			}), {
				loading: 'Login...',
			success: <b>Login successful!</b>,
			error: <b>Login failed.</b>,
		})
	}

	return (
		<div className='container'>
			<Toaster />
			<dialog open>
				<motion.article
					initial={{ opacity: 0, y: '-100%' }}
					animate={{ opacity: 1, y: '0%' }}
					exit={{ opacity: 0, y: '-100%' }}
					transition={{ ease: 'easeInOut', duration: 0.2 }}
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
					{/* <UserSlector /> */}
					<form onSubmit={handleSubmit}>
						<label htmlFor="email" >Email:</label>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@email.com' />
						<label htmlFor="password">Password:</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='********' />
						<div role='group' className='' style={{ width: '100%' }}>
							<button className='secondary' onClick={signInWithGoogle}><FcGoogle /> Google</button>
							<button type='submit' ><MdEmail /> Email</button>
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
