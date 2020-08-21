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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const Middleware_1 = require("./Middleware");
const Utils_1 = require("./Utils");
class App {
    constructor(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(cors_1.default({ credentials: true, origin: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(compression_1.default());
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(Middleware_1.errorMiddleware);
    }
    connectToDatabase() {
        mongoose_1.default
            .connect('mongodb://mongo:27017/api', { useNewUrlParser: true })
            .then(() => __awaiter(this, void 0, void 0, function* () {
            console.log(process.env.NODE_ENV);
            if (process.env.NODE_ENV === 'development') {
                yield Utils_1.saveMockUser();
                yield Utils_1.saveMockRecipes();
            }
            console.log('MongoDB Connected');
        }))
            .catch((err) => console.log(err));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map