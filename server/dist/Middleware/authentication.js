"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandling_1 = require("./errorHandling");
// import { userModel } from '../Models'
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../Entities/User.entity");
function authMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = request.headers["x-access-token"];
        const userRepository = typeorm_1.getRepository(User_entity_1.UserEntity);
        if (token) {
            const secret = process.env.JWT_SECRET;
            try {
                const verificationResponse = jsonwebtoken_1.default.verify(token, secret);
                const id = verificationResponse.id;
                const user = yield userRepository.findOne(id);
                if (user) {
                    request.user = user;
                    next();
                }
                else {
                    next(new errorHandling_1.WrongAuthenticationTokenException());
                }
            }
            catch (error) {
                next(new errorHandling_1.WrongAuthenticationTokenException());
            }
        }
        else {
            next(new errorHandling_1.AuthenticationTokenMissingException());
        }
    });
}
exports.authMiddleware = authMiddleware;
exports.default = authMiddleware;
//# sourceMappingURL=authentication.js.map