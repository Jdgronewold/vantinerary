"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
class RecipeNotFoundException extends HttpException {
    constructor(id) {
        super(404, `Recipe with id ${id} not found`);
    }
}
exports.RecipeNotFoundException = RecipeNotFoundException;
class UserWithThatEmailAlreadyExistsException extends HttpException {
    constructor(email) {
        super(400, `User with email ${email} already exists`);
    }
}
exports.UserWithThatEmailAlreadyExistsException = UserWithThatEmailAlreadyExistsException;
class EmailOrPasswordNotSufficient extends HttpException {
    constructor() {
        super(422, `Password must be at least 5 characters long and you must submit a valid email`);
    }
}
exports.EmailOrPasswordNotSufficient = EmailOrPasswordNotSufficient;
class WrongCredentialsException extends HttpException {
    constructor() {
        super(401, 'Incorrect email or password provided');
    }
}
exports.WrongCredentialsException = WrongCredentialsException;
class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, 'Wrong authentication token');
    }
}
exports.WrongAuthenticationTokenException = WrongAuthenticationTokenException;
class AuthenticationTokenMissingException extends HttpException {
    constructor() {
        super(401, 'Authentication token missing');
    }
}
exports.AuthenticationTokenMissingException = AuthenticationTokenMissingException;
class DeleteNoteUnsuccessfulException extends HttpException {
    constructor() {
        super(400, 'Note deletion was not successful');
    }
}
exports.DeleteNoteUnsuccessfulException = DeleteNoteUnsuccessfulException;
class DeleteItineraryUnsuccessfulException extends HttpException {
    constructor() {
        super(400, 'Itinerary deletion was not successful');
    }
}
exports.DeleteItineraryUnsuccessfulException = DeleteItineraryUnsuccessfulException;
class EditItineraryUnsuccessfulException extends HttpException {
    constructor() {
        super(400, 'Itinerary Edit was not successful');
    }
}
exports.EditItineraryUnsuccessfulException = EditItineraryUnsuccessfulException;
class EditNoteUnsuccessfulException extends HttpException {
    constructor() {
        super(400, 'Note edit was not successful');
    }
}
exports.EditNoteUnsuccessfulException = EditNoteUnsuccessfulException;
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send(message);
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorHandling.js.map