import { IUser, TokenData } from "../state/userState";
import { defaultUser } from '../state/userState'

export const isUserLoggedIn = (user: IUser): boolean => !!user._id.length

export const createUser = (name: string, email: string, password: string): IUser => {
  return {
    ...defaultUser,
    name,
    email,
    password
  }
}

export const saveTokenAndUser = ({ expiresIn, token }: TokenData, user: IUser) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(
        "auth:expires_in",
        JSON.stringify(expiresIn)
    );
    localStorage.setItem("auth:token", JSON.stringify(token));
    localStorage.setItem("auth:user", JSON.stringify(user))
  }
}

export const clearTokenAndUser = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("auth:expires_in")
    localStorage.removeItem("auth:token")
    localStorage.removeItem("auth:user")
  }
}

export const getTokenAndUser = (): { tokenData: TokenData, user: IUser } => {
  if (typeof localStorage !== "undefined") {
    const expiresIn = localStorage.getItem("auth:expires_in")
    const token = localStorage.getItem("auth:token")
    const user = localStorage.getItem("auth:user")

    if (expiresIn && token && user) {
      return { tokenData: { expiresIn, token }, user: JSON.parse(user) }
    } 
  }

  return { tokenData: { expiresIn: '', token: '' }, user: defaultUser }
}