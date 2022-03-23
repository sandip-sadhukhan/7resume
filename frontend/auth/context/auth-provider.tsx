import React, { useReducer } from "react"
import { initialState, authReducer } from "../reducer"
import AuthContext from "./auth-context"

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
