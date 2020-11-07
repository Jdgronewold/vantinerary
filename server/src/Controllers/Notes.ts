import * as express from 'express';
import { noteModel } from '../Models'
import { IController, INote, IRequestWithUser } from '../Types'
import { authMiddleware, DeleteNoteUnsuccessfulException, EditNoteUnsuccessfulException } from '../Middleware'

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
      this.router.put(`${this.path}`, authMiddleware, this.editNote);
      this.router.delete(`${this.path}`, authMiddleware, this.deleteNote);
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

    editNote = (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const noteFromRequest: INote = request.body
      const { user } = request
      if (user) {
        noteModel.findById(noteFromRequest._id, (err, note) => {
          
          if (note) {
            note.body = noteFromRequest.body
            note.date = noteFromRequest.date
            note.title = noteFromRequest.title
            note.showOnCalendar = noteFromRequest.showOnCalendar
            note.save()
            response.send(note)
          } else {
            next(new EditNoteUnsuccessfulException())
          }
        })
      } else {
        next(new EditNoteUnsuccessfulException())
      }
    }

    deleteNote = (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const noteIDFromRequest: string = request.body.id
      const { user } = request
      console.log(noteIDFromRequest)
      
      if (user) {
        noteModel.findById(noteIDFromRequest, (err, note) => {
          console.log('note', note);
          console.log('error', err);
          
          if (note) {
            note.remove()
            const userNoteIDIndex = user.noteIds.findIndex((noteID) => noteID === noteIDFromRequest)
            user.noteIds.splice(userNoteIDIndex, 1)
            user.save()
            console.log(user);
            response.send(note)
          } else {
            next(new DeleteNoteUnsuccessfulException())
          }
        })
      } else {
        next(new DeleteNoteUnsuccessfulException())
      }
      
    }
}