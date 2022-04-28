import { Dispatch } from "react"

export interface IUser {
  access: string
  username: string
  name: string
  profile_picture: string
}

export interface IState {
  user: IUser | null
  isAuthenticated: boolean
  loading: boolean
}

export interface IAction {
  type: string
  payload?: IUser
}

export interface IContext {
  state: IState
  dispatch: Dispatch<IAction>
}
