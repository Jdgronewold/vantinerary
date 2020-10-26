import * as express from 'express';
import { noteModel } from '../Models'
import { IController, INote, IRequestWithUser } from '../Types'
import { authMiddleware } from '../Middleware'
import { Mongoose } from 'mongoose';

export class NotesController implements IController {
    public path = '/notes'
    public router = express.Router()
    private notes = noteModel
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(this.path, authMiddleware, this.getAllNotes);
      // this.router.post(this.path, authMiddleware, this.createRecipe);
    }

    getAllNotes = (request: IRequestWithUser, response: express.Response) => {
      if (request.user) {
        // constrain this to reasonable dates at some point
        this.notes.find({_id: { $in : request.user.noteIds } }).then((notes: INote[]) => {
          response.send(notes)
        })
      }
    }

    // createRecipe = (request: IRequestWithUser, response: express.Response) => {
    //   const recipe: IRecipe = request.body
    //   if (request.user) {
    //     recipe.authorId = request.user._id
    //     const createdRecipe = new recipeModel(recipe)
    //     createdRecipe.save().then((savedRecipe: IRecipe) => {
    //         response.send(savedRecipe)
    //     })
    //   }
    // }
}