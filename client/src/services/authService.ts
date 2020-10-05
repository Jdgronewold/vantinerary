import axios, { AxiosResponse } from 'axios'
import { createUser, saveToken } from '../utils/userUtils'
import { TokenData } from '../state/userState'

const BASE_AUTH_PATH = 'api/auth/'

export const register = (name: string, email: string, password: string) => {
  return axios
    .post(BASE_AUTH_PATH + 'register', createUser(name, email, password))
    .then((response: AxiosResponse<TokenData>) => {
      console.log(response);
      saveToken(response.data)
    })
}
