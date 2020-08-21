import { NextFunction, Request, Response } from 'express';


class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class RecipeNotFoundException extends HttpException {
    constructor(id: string) {
      super(404, `Recipe with id ${id} not found`);
    }
}

export class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email: string) {
      super(400, `User with email ${email} already exists`);
    }
}

export class EmailOrPasswordNotSufficient extends HttpException {
  constructor() {
    super(422, `Password must be at least 5 characters long and you must submit a valid email`);
  }
}

export class WrongCredentialsException extends HttpException {
    constructor() {
      super(401, 'Wrong credentials provided');
    }
}

export class WrongAuthenticationTokenException extends HttpException {
    constructor() {
      super(401, 'Wrong authentication token');
    }
}

export class AuthenticationTokenMissingException extends HttpException {
    constructor() {
      super(401, 'Authentication token missing');
    }
}


export function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
      .status(status)
      .send({
        status,
        message,
      })
  }