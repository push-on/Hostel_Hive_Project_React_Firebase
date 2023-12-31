import { createContext, useEffect, useReducer } from "react"
import AuthReducer, { AuthState, AuthAction } from "./AuthReducer"

export interface User {
  uid: string
  email?: string
}

interface AuthContextValue {
  currentUser: User | null
  currentRole: string | null
  paymentStatus: string | null
  dispatch: React.Dispatch<AuthAction>
}

const INITIAL_STATE: AuthState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string) || null
    : null,
  currentRole: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("role") as string) || null
    : null,
  paymentStatus: null,
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  currentRole: null,
  paymentStatus: null,
  dispatch: () => null,
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser))
    localStorage.setItem("role", JSON.stringify(state.currentRole))
  }, [state])

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        currentRole: state.currentRole,
        paymentStatus: state.paymentStatus,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
