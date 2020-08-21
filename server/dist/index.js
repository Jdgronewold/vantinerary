"use strict";
// things to go back and pay attention to:
// 1) process.on
// 2) error handling
// 3 read node best practices in https://github.com/i0natan/nodebestpractices
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const Controllers_1 = require("./Controllers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new App_1.default([
    new Controllers_1.AuthController(),
    new Controllers_1.RecipesController(),
], 5000);
app.listen();
//# sourceMappingURL=index.js.map