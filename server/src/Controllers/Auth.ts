import * as bcrypt from 'bcryptjs'
import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { IController, IUser, ILogin, IDataStoredInToken, ITokenData } from '../Types'
import { userModel } from '../Models'
import { EmailOrPasswordNotSufficient, UserWithThatEmailAlreadyExistsException, WrongCredentialsException } from '../Middleware'
import { check, validationResult } from 'express-validator'

export class AuthController implements IController {
    public path = '/auth'
    public router = express.Router()
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.validateRegistration(), this.registration);
        this.router.post(`${this.path}/login`, this.validateLogin(), this.loggingIn);
    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            next( new EmailOrPasswordNotSufficient())
            return
          }
        const userData: IUser = request.body;
        
        if (
            await this.user.findOne({ email: userData.email })
        ) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        } else {
            try {
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                const user = await this.user.create({
                    ...userData,
                    password: hashedPassword,
                    _id: new mongoose.Types.ObjectId()
                });

                const tokenData = this.createToken(user);    
                response.send({ data: { key: tokenData.token }});
            } catch (error) {
                next(error)
            }
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: ILogin = request.body;
        const user = await this.user.findOne({ email: logInData.email });
        if (user) {
          const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
          if (isPasswordMatching) {
            const tokenData = this.createToken(user);
            response.send({ data: { key: tokenData.token }});
          } else {
            next(new WrongCredentialsException());
          }
        } else {
          next(new WrongCredentialsException());
        }
    }

    private validateRegistration() {
        return [
            check('email').isEmail(),
            check('password').isLength({ min: 5 })
        ]
    }

    private validateLogin() {
        return [
            check('email').isString(),
            check('password').isString()
        ]
    }

    private createToken(user: IUser) {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET!;
        const dataStoredInToken: IDataStoredInToken = {
            _id: user._id,
        };

        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}