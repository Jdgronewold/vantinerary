import axios, { AxiosResponse } from 'axios'
import { createUser, saveTokenAndUser, getTokenAndUser } from '../utils/userUtils'
import { TokenData, IUser } from '../state/userState'

const BASE_AUTH_PATH = 'api/auth/'

export interface SuccessLogin {
  tokenData: TokenData,
  user: IUser
}

export const register = (name: string, email: string, password: string): Promise<SuccessLogin> => {
  return axios
    .post(BASE_AUTH_PATH + 'register', createUser(name, email, password))
    .then((response: AxiosResponse<SuccessLogin>) => {
      const { tokenData, user } = response.data
      saveTokenAndUser(tokenData, user)
      return response.data
    })
}

export const login = (email: string, password: string): Promise<SuccessLogin> => {
  return axios
    .post(BASE_AUTH_PATH + 'login', { email, password })
    .then((response: AxiosResponse<SuccessLogin>) => {
      const { tokenData, user } = response.data
      saveTokenAndUser(tokenData, user)
      return response.data
    })
}

export const getAuthHeader = () => {
  const { tokenData } = getTokenAndUser()

  if (!!tokenData.token) {
    return { 'x-access-token': tokenData.token };
  } else {
    return {};
  }
}