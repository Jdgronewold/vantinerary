import * as express from 'express';
import { IController, INote, IRequestWithUser } from '../Types'
import { authMiddleware, DeleteNoteUnsuccessfulException, EditNoteUnsuccessfulException } from '../Middleware'
import { getRepository } from 'typeorm';
import { NoteEntity } from '../Entities';

export class NotesController implements IController {
    public path = '/notes'
    public router = express.Router()
    private notesRepository = getRepository(NoteEntity)
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.getAllNotes);
      this.router.post(`${this.path}`, authMiddleware, this.createNote);
      this.router.put(`${this.path}`, authMiddleware, this.editNote);
      this.router.delete(`${this.path}`, authMiddleware, this.deleteNote);
    }

    getAllNotes = async (request: IRequestWithUser, response: express.Response) => {
      if (request.user) {
        // constrain this to reasonable dates at some point
        const notes = await this.notesRepository.find({ where: { user: request.user }})
        response.send(notes)
      
      }
    }

    createNote = async (request: IRequestWithUser, response: express.Response) => {
      const note: INote = request.body
      const { user } = request
      if (user) {
        const newNote = this.notesRepository.create({ ...note, user })
        const savedNote = await this.notesRepository.save(newNote)

        response.send(savedNote)
      }
    }

    editNote = async (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const noteFromRequest: INote = request.body
      const { user } = request
      if (user) {
        const note = await this.notesRepository.findOne(noteFromRequest.id)
          
        if (note) {
          this.notesRepository.merge(note, noteFromRequest)

          const savedNote = await this.notesRepository.save(note)
          response.send(savedNote)
        } else {
          next(new EditNoteUnsuccessfulException())
        }
      } else {
        next(new EditNoteUnsuccessfulException())
      }
    }

    deleteNote = async (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const noteIDFromRequest: string = request.body.id
      const { user } = request
      
      if (user) {
        const results = await this.notesRepository.delete(noteIDFromRequest)
        if (results.affected && results.affected > 0) {
          response.send({ id: noteIDFromRequest })
        } else {
          next(new DeleteNoteUnsuccessfulException())
        }
      } else {
        next(new DeleteNoteUnsuccessfulException())
      }
      
    }
}