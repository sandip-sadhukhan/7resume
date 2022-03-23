import { IAction, IState } from "../../types/auth"
import {
  // SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants"

export const initialState: IState = {
  token: null,
  isAuthenticated: false,
  loading: true,
}

export const authReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCESS:
      const accessToken = payload?.access as string
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: accessToken,
      }
    // case SIGNUP_SUCCESS:
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     loading: true,
    //   }
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
