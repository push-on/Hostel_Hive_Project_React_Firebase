import { createContext, useEffect, useReducer } from 'react'
import AuthReducer, { AuthState, AuthAction } from './AuthReducer'

export interface User {
	uid: string,
	email?: string,
}

interface AuthContextValue {
	currentUser: User | null
	currentRole: string | null
	dispatch: React.Dispatch<AuthAction>
}

const INITIAL_STATE: AuthState = {
	currentUser: JSON.parse(localStorage.getItem('user') as string) || null,
	currentRole: JSON.parse(localStorage.getItem('role') as string) || null
}

export const AuthContext = createContext<AuthContextValue>({
	currentUser: null,
	currentRole: null,
	dispatch: () => null
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.currentUser))
		localStorage.setItem('role', JSON.stringify(state.currentRole))
	}, [state])


	return (
		<AuthContext.Provider value={{ currentUser: state.currentUser, currentRole: state.currentRole, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}