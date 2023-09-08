

export interface User {
	uid: string
}
export interface AuthAction {
	type: 'LOGIN' | 'LOGOUT'
	payload:  User | null
}
export interface AuthState {
	currentUser: null | User
}
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				currentUser: action.payload
			}

		case 'LOGOUT':
			return {
				...state,
				currentUser: null
			}

		default:
			return state
	}
}

export default AuthReducer