import * as express from 'express';
import { noteModel } from '../Models'
import { IController, INote, IRequestWithUser } from '../Types'
import { authMiddleware } from '../Middleware'

export class NotesController implements IController {
    public path = '/notes'
    public router = express.Router()
    private notes = noteModel
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.getAllNotes);
      this.router.post(`${this.path}`, authMiddleware, this.createNote);
    }

    getAllNotes = (request: IRequestWithUser, response: express.Response) => {
      if (request.user) {
        // constrain this to reasonable dates at some point
        this.notes.find({_id: { $in : request.user.noteIds } }).then((notes: INote[]) => {
          response.send(notes)
        })
      }
    }

    createNote = (request: IRequestWithUser, response: express.Response) => {
      const note: INote = request.body
      const { user } = request
      if (user) {
        note.authorId = user._id
        const createdNote = new noteModel(note)
        const notePromise = createdNote.save()
        user.noteIds.push(createdNote._id)
        const userPromise = user.save()

        
        
        Promise.all([notePromise, userPromise]).then(([savedNote]) => {
            response.send(savedNote)
        })
      }
    }
}