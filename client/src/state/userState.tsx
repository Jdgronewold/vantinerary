import React, { useReducer } from 'react'

import { UserActions, UserActionTypes } from '../actions/userActions'

export interface IUser {
  name: string;
  email: string;
  password: string;
  friends: string[];
  locations: string[];
  tripDiaryId: string;
  _id: string;
}

export interface TokenData {
  token: string
  expiresIn: string
}

export const defaultUser: IUser = {
  name: '',
  email: '',
  password: '',
  friends: [],
  locations: [],
  tripDiaryId: '',
  _id: ''
}

interface UserState {
  user: IUser
}

type UserContextType = { user: IUser, userDispatch: React.Dispatch<UserActions>}

export const UserContext = React.createContext<UserContextType>({ user: defaultUser, userDispatch: () => {}})

function userReducer(state: UserState, action: UserActions): UserState {
  switch(action.type) {
    case UserActionTypes.USER_LOGIN: {
      return { user: action.payload }
    }
    case UserActionTypes.USER_LOGOUT: {
      return { user: defaultUser }
    }
    default:
      return state
  }
}

export const UserProvider: React.FunctionComponent = ({ children }) => {
  const [ { user }, userDispatch] = useReducer(userReducer, { user: defaultUser })
  return (
    <UserContext.Provider value={{ user, userDispatch}}>
      { children }
    </UserContext.Provider>
  )
}