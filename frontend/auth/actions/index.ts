import { Dispatch } from "react"
import { IAction } from "../../types/auth"
import {
  //   SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants"

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

const headers = {
  "Content-Type": "application/json",
}

// login action
export const login = async (
  email: string,
  password: string,
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  const body = JSON.stringify({ email, password })

  try {
    const res = await fetch(`${BASE_API_URL}/api/token/`, {
      method: "POST",
      body,
      headers,
    })
    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          access: data.access,
        },
      })

      localStorage.setItem("token", data.access)
      return [true, "Login Successfully"]
    } else {
      dispatch({
        type: LOGIN_FAIL,
      })

      localStorage.removeItem("token")
      return [false, data.detail]
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    })

    localStorage.removeItem("token")
    return [false, "Something went Wrong"]
  }
}

export const signup = async (
  username: string,
  name: string,
  email: string,
  password: string,
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  const body = JSON.stringify({ username, name, email, password })

  try {
    const res = await fetch(`${BASE_API_URL}/api/accounts/signup/`, {
      method: "POST",
      body,
      headers,
    })
    const data = await res.json()

    if (data.success) {
      return await login(email, password, dispatch)
    } else {
      dispatch({
        type: SIGNUP_FAIL,
      })
      localStorage.removeItem("token")
      return [false, data.error]
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    })
    localStorage.removeItem("token")
    return [false, "Signup Failed"]
  }
}

export const logout = (dispatch: Dispatch<IAction>) => {
  dispatch({ type: LOGOUT })
  localStorage.removeItem("token")
}

export const authenticate = async (
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  const token = localStorage.getItem("token")

  if (!token) {
    dispatch({
      type: LOGIN_FAIL,
    })
    localStorage.removeItem("token")
    return [false, "Please Login/Signup to continue"]
  }

  try {
    const res = await fetch(`${BASE_API_URL}/api/accounts/get-user/`, {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { access: token },
      })

      return [true, "Login Successfully"]
    } else {
      dispatch({
        type: LOGIN_FAIL,
      })
      localStorage.removeItem("token")
      return [false, "Please Login/Signup to continue"]
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    })
    localStorage.removeItem("token")
    return [false, "Please Login to continue"]
  }
}
