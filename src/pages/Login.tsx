import { useContext, useEffect, useState } from 'react'
import { auth, db, googleProvider } from "../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { currentUser, dispatch, currentRole } = useContext(AuthContext)

	const signInWithGoogle = async (e: React.FormEvent) => {
		e.preventDefault()
		await signInWithPopup(auth, googleProvider).then((userCredentials) => {
			const user = userCredentials.user
			getDoc(doc(db, "users", user.uid)).then((doc) => {
				if (currentRole === doc.data()?.role) {
					dispatch({ type: 'LOGIN', payload: user, role: doc.data()?.role })
					navigate('/dashboard')
					toast.success("Role Matched & login successful")
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

				if (currentRole === doc.data()?.role) {
					dispatch({ type: 'LOGIN', payload: user, role: doc.data()?.role })
					navigate('/dashboard')
					toast.success("Role Matched & login successful")
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
			<Toaster />
			<dialog open>
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
					<UserSlector />
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

function UserSlector() {
	const { dispatch } = useContext(AuthContext)
	const [Role, setRole] = useState<"" | "student" | "staff" | "admin">("student")
	useEffect(() => { dispatch({ type: 'LOGIN', payload: null, role: "student" }) }, [])

	return (
		<div role="group" style={{ width: '100%' }}>
			<button
				className={`outline ${Role === "student" ? "" : "secondary"}`}
				onClick={() => {
					setRole("student")
					dispatch({ type: 'LOGIN', payload: null, role: "student" })
				}}
			>
				Student
			</button>
			<button className={`outline ${Role === "staff" ? "" : "secondary"}`}
				onClick={() => {
					setRole("staff")
					dispatch({ type: 'LOGIN', payload: null, role: "staff" })
				}}
			>
				Staff
			</button>
			<button className={`outline ${Role === "admin" ? "" : "secondary"}`}
				onClick={() => {
					setRole("admin")
					dispatch({ type: 'LOGIN', payload: null, role: "admin" })
				}}
			>
				Admin
			</button>
		</div>
	)
}