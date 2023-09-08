import { createContext, useEffect, useReducer } from 'react'
import AuthReducer, { AuthState, AuthAction } from './AuthReducer'

export interface User {
	uid: string,
	email?: string,
}

interface AuthContextValue {
	currentUser: User | null
	dispatch: React.Dispatch<AuthAction>
}
const INITIAL_STATE: AuthState = {
	currentUser: JSON.parse(localStorage.getItem('user') as string) || null,
}

export const AuthContext = createContext<AuthContextValue>({
	currentUser: null,
	dispatch: () => null
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.currentUser))
	}, [state])
	

	return (
		<AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}