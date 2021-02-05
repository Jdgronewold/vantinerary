import React, { useReducer, useState, useEffect } from 'react'

import { UserActions, UserActionTypes } from '../actions/userActions'
import { getTokenAndUser } from '../utils/userUtils'

export interface IUser {
  name: string;
  email: string;
  password: string;
  id?: string;
}

export interface TokenData {
  token: string
  expiresIn: string
}

export const defaultUser: IUser = {
  name: '',
  email: '',
  password: '',
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
  const [ { user }, userDispatch] = useReducer(userReducer, { user: getTokenAndUser().user })
  const [contextValue, setContext] = useState<UserContextType>({ user, userDispatch })

  useEffect(() => {
    setContext((contextValue: UserContextType) => ({
      ...contextValue,
      user
    }))
  }, [user])

  return (
    <UserContext.Provider value={contextValue}>
      { children }
    </UserContext.Provider>
  )
}