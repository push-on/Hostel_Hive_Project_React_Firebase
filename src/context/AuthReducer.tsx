

export interface User {
	uid: string

}
export interface AuthAction {
	type: 'LOGIN' | 'LOGOUT'
	payload: User | null,
	role: 'student' | 'staff' | 'admin' | ''
}
export interface AuthState {
	currentUser: null | User
	currentRole: string
}
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				currentUser: action.payload,
				currentRole: action.role
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