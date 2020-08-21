import { Request } from 'express';

export interface IUser {
    name: string;
    email: string;
    password: string;
    _id: string;
}

export interface ILogin {
  email: string
  password: string
}


export interface IDataStoredInToken {
  _id: string;
}


export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IRequestWithUser extends Request {
  user?: IUser;
}

