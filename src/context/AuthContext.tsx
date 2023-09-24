import { createContext, useEffect, useReducer } from 'react'
import AuthReducer, { AuthState, AuthAction } from './AuthReducer'

export interface User {
	uid: string,
	email?: string,
}

interface AuthContextValue {
	currentUser: User | null
	currentRole: string
	dispatch: React.Dispatch<AuthAction>
}

const INITIAL_STATE: AuthState = {
	currentUser: JSON.parse(localStorage.getItem('user') as string) || null,
	currentRole: ""
}

export const AuthContext = createContext<AuthContextValue>({
	currentUser: null,
	currentRole: "",
	dispatch: () => null
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.currentUser))
	}, [state])
	

	return (
		<AuthContext.Provider value={{ currentUser: state.currentUser, currentRole: state.currentRole , dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}