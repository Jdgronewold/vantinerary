import * as express from 'express';
import { recipeModel } from '../Models'
import { IController, IRecipe, IRequestWithUser } from '../Types'
import { authMiddleware } from '../Middleware'

export class RecipesController implements IController {
    public path = '/recipes'
    public router = express.Router()
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(this.path, this.getAllRecipes);
      this.router.post(this.path, authMiddleware, this.createRecipe);
    }

    getAllRecipes = (request: express.Request, response: express.Response) => {
      recipeModel.find().then((recipes: IRecipe[]) => {
          response.send(recipes)
      })
    }

    createRecipe = (request: IRequestWithUser, response: express.Response) => {
      const recipe: IRecipe = request.body
      if (request.user) {
        recipe.authorId = request.user._id
        const createdRecipe = new recipeModel(recipe)
        createdRecipe.save().then((savedRecipe: IRecipe) => {
            response.send(savedRecipe)
        })
      }
    }
}