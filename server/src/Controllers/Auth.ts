import * as bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import { IController, IUser, ILogin, IDataStoredInToken, ITokenData } from '../Types'
import { EmailOrPasswordNotSufficient, UserWithThatEmailAlreadyExistsException, WrongCredentialsException } from '../Middleware'
import { check, validationResult } from 'express-validator'
import { getRepository } from 'typeorm'
import { UserEntity } from '../Entities'

export class AuthController implements IController {
    public path = '/auth'
    public router = express.Router()
    private userRepository = getRepository(UserEntity)

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
        const userExists = await this.userRepository.find({ email: userData.email })
                
        if ( userExists.length) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        } else {
            try {
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                console.log(userData);
                
                const user = this.userRepository.create({
                    ...userData,
                    password: hashedPassword
                })

                const results = await this.userRepository.save(user);

                const tokenData = this.createToken(results);
                response.send({ tokenData, user: { ...results, password: '' } });
            } catch (error) {
                next(error)
            }
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: ILogin = request.body;
        const user = await this.userRepository.findOne({ email: logInData.email });
        if (user) {
          const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
          if (isPasswordMatching) {
            const tokenData = this.createToken(user);
            console.log('TOKEN_LOGIN', tokenData.token);
            
            response.send({ tokenData, user: { ...user, password: '' }});
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

    private createToken(user: UserEntity, expiresIn = 60 * 60 * 60): ITokenData {
        const secret = process.env.JWT_SECRET!;
        const dataStoredInToken: IDataStoredInToken = {
            id: user.id ? user.id : '',
        };

        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}