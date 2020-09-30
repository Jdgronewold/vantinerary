import { BaseAction } from './generalActions'
import { IUser } from '../../../server/src/Types';

export enum UserActionTypes {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT"
}
export interface UserLoginAction extends BaseAction<UserActionTypes.USER_LOGIN> {
  payload: IUser
}

export interface UserLogoutAction extends BaseAction<UserActionTypes.USER_LOGOUT> {}

export type UserActions = UserLoginAction | UserLogoutAction