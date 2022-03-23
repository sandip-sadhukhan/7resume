import { Dispatch } from "react"

export interface IState {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export interface IAction {
  type: string
  payload?: {
    access: string
  }
}

export interface IContext {
  state: IState
  dispatch: Dispatch<IAction>
}
