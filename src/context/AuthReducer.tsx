

export interface User {
	uid: string

}
export interface AuthAction {
	type: 'LOGIN' | 'LOGOUT'
	payload: User | null,
	role: 'student' | 'staff' | 'admin' | null
	paymentStatus: boolean | null
}
export interface AuthState {
  currentUser: null | User
  currentRole: string | null
  paymentStatus: boolean | null
}
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				currentUser: action.payload,
				currentRole: action.role,
				paymentStatus: action.paymentStatus
			}

		case 'LOGOUT':
			return {
				...state,
				currentUser: null,
				currentRole: null,
				paymentStatus: null
			}

		default:
			return state
	}
}

export default AuthReducer