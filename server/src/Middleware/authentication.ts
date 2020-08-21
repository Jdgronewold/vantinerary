import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { WrongAuthenticationTokenException, AuthenticationTokenMissingException } from './errorHandling'
import { IRequestWithUser, IDataStoredInToken } from '../Types'
import { userModel } from '../Models'


export async function authMiddleware(request: IRequestWithUser, response: Response, next: NextFunction) {
  const token = request.headers.authorization;  
  if (token) {
    const secret: string = process.env.JWT_SECRET!;
    try {
      const verificationResponse = jwt.verify(token, secret) as IDataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}
 
export default authMiddleware;