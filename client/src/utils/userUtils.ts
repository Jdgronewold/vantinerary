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

export const saveToken = ({ expiresIn, token }: TokenData) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(
        "auth:expires_in",
        JSON.stringify(expiresIn)
    );
    localStorage.setItem("auth:token", JSON.stringify(token));
}
}