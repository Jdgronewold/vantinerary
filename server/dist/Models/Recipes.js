"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recipeSchema = new mongoose_1.default.Schema({
    author: String,
    ingredients: [{
            quantity: String,
            name: String
        }],
    name: String,
    authorId: String
});
exports.recipeModel = mongoose_1.default.model('Recipe', recipeSchema);
//# sourceMappingURL=Recipes.js.map