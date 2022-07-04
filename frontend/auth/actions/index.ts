import { Dispatch } from "react"
import axios from "../../utils/axiosInstance"
import { IAction } from "../../types/auth"
import { SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants"
import { AxiosError } from "axios"

// remove items from localstorage
const localStorageClear = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("name")
  localStorage.removeItem("profile_pic")
}

// save items to localstorage
const localStorageSave = (
  token: string,
  username: string,
  name: string,
  profile_picture: string
) => {
  localStorage.setItem("token", token)
  localStorage.setItem("username", username)
  localStorage.setItem("name", name)
  localStorage.setItem("profile_pic", profile_picture)
}

// login action
interface ILoginResult {
  username: string
  name: string
  profile_picture: string
  access: string
}
export const login = async (
  email: string,
  password: string,
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const response = await axios.post(
      "/api/accounts/login/",
      { email, password },
      config
    )

    const data: ILoginResult = response.data

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        username: data.username,
        name: data.name,
        profile_picture: data.profile_picture,
        access: data.access,
      },
    })

    localStorageSave(
      data.access,
      data.username,
      data.name,
      data.profile_picture
    )

    return [true, "Login Successfully"]
  } catch (error) {
    const err = error as AxiosError

    // Dispatch the data
    dispatch({
      type: LOGIN_FAIL,
    })
    localStorageClear()

    if (err.response?.status === 401) {
      return [false, "Email or Password is incorrect."]
    } else {
      console.log(err)
      return [false, `${err.message}`]
    }
  }
}

export const signup = async (
  username: string,
  name: string,
  email: string,
  password: string,
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    await axios.post(
      "/api/accounts/signup/",
      {
        username,
        name,
        email,
        password,
      },
      config
    )

    return await login(email, password, dispatch)
  } catch (error) {
    const err = error as AxiosError

    dispatch({
      type: SIGNUP_FAIL,
    })
    localStorageClear()
    console.log(err)

    interface errorResponse {
      data: {
        error: string
      }
    }
    const response = err.response as errorResponse

    return [false, response.data.error]
  }
}

export const logout = (dispatch: Dispatch<IAction>) => {
  dispatch({ type: LOGOUT })
  localStorageClear()
}

interface IAuthenticateResult {
  username: string
  name: string
  profile_picture: string
}
export const authenticate = async (
  dispatch: Dispatch<IAction>
): Promise<[boolean, string]> => {
  const token = localStorage.getItem("token")

  if (!token) {
    dispatch({
      type: LOGIN_FAIL,
    })
    localStorageClear()
    return [false, "Please Login/Signup to continue"]
  }

  try {
    const response = await axios.get("/api/accounts/get-user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data: IAuthenticateResult = await response.data

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        access: token,
        username: data.username,
        name: data.name,
        profile_picture: data.profile_picture,
      },
    })

    return [true, "Login Successfully"]
  } catch (error) {
    const err = error as AxiosError

    dispatch({
      type: LOGIN_FAIL,
    })

    localStorageClear()
    console.log(err)

    return [false, "Please Login to continue"]
  }
}
