"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Middleware_1 = require("../Middleware");
const express_validator_1 = require("express-validator");
const typeorm_1 = require("typeorm");
const Entities_1 = require("../Entities");
class AuthController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.default.Router();
        this.userRepository = typeorm_1.getRepository(Entities_1.UserEntity);
        this.registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const errors = express_validator_1.validationResult(request);
            if (!errors.isEmpty()) {
                next(new Middleware_1.EmailOrPasswordNotSufficient());
                return;
            }
            const userData = request.body;
            if (yield this.userRepository.find({ email: userData.email })) {
                next(new Middleware_1.UserWithThatEmailAlreadyExistsException(userData.email));
            }
            else {
                try {
                    const hashedPassword = yield bcrypt.hash(userData.password, 10);
                    const user = this.userRepository.create(Object.assign({}, userData, { password: hashedPassword }));
                    const results = yield this.userRepository.save(user);
                    const tokenData = this.createToken(results);
                    response.send({ tokenData, user: Object.assign({}, results, { password: '' }) });
                }
                catch (error) {
                    next(error);
                }
            }
        });
        this.loggingIn = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = request.body;
            const user = yield this.userRepository.findOne({ email: logInData.email });
            if (user) {
                const isPasswordMatching = yield bcrypt.compare(logInData.password, user.password);
                if (isPasswordMatching) {
                    const tokenData = this.createToken(user);
                    console.log('TOKEN_LOGIN', tokenData.token);
                    response.send({ tokenData, user: Object.assign({}, user, { password: '' }) });
                }
                else {
                    next(new Middleware_1.WrongCredentialsException());
                }
            }
            else {
                next(new Middleware_1.WrongCredentialsException());
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.validateRegistration(), this.registration);
        this.router.post(`${this.path}/login`, this.validateLogin(), this.loggingIn);
    }
    validateRegistration() {
        return [
            express_validator_1.check('email').isEmail(),
            express_validator_1.check('password').isLength({ min: 5 })
        ];
    }
    validateLogin() {
        return [
            express_validator_1.check('email').isString(),
            express_validator_1.check('password').isString()
        ];
    }
    createToken(user, expiresIn = 60 * 60 * 60) {
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = {
            id: user.id ? user.id : '',
        };
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=Auth.js.map