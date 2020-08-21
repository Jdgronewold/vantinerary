"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Models_1 = require("../Models");
const Middleware_1 = require("../Middleware");
class RecipesController {
    constructor() {
        this.path = '/recipes';
        this.router = express.Router();
        this.getAllRecipes = (request, response) => {
            Models_1.recipeModel.find().then((recipes) => {
                response.send(recipes);
            });
        };
        this.createRecipe = (request, response) => {
            const recipe = request.body;
            if (request.user) {
                recipe.authorId = request.user._id;
                const createdRecipe = new Models_1.recipeModel(recipe);
                createdRecipe.save().then((savedRecipe) => {
                    response.send(savedRecipe);
                });
            }
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllRecipes);
        this.router.post(this.path, Middleware_1.authMiddleware, this.createRecipe);
    }
}
exports.RecipesController = RecipesController;
//# sourceMappingURL=Recipes.js.map