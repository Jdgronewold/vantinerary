import React, { useReducer } from 'react'

import { IUser } from '../../../../server/src/Types'
import { UserActions, UserActionTypes } from '../../actions/userActions'

const UserContext = React.createContext({})

interface UserState {
  user: IUser
}

const defaultUser: IUser = {
  name: '',
  email: '',
  password: '',
  friends: [],
  locations: [],
  tripDiaryId: '',
  _id: ''
}

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
  const [user, userDispatch] = useReducer(userReducer, { user: defaultUser })
  return (
    <UserContext.Provider value={{ user, userDispatch}}>
      { children }
    </UserContext.Provider>
  )
}