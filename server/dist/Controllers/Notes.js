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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Middleware_1 = require("../Middleware");
const typeorm_1 = require("typeorm");
const Note_entity_1 = require("../Entities/Note.entity");
class NotesController {
    constructor() {
        this.path = '/notes';
        this.router = express.Router();
        this.notesRepository = typeorm_1.getRepository(Note_entity_1.NoteEntity);
        this.getAllNotes = (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (request.user) {
                // constrain this to reasonable dates at some point
                const notes = yield this.notesRepository.find({ where: { user: request.user } });
                response.send(notes);
            }
        });
        this.createNote = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const note = request.body;
            const { user } = request;
            if (user) {
                // const newNote = this.notesRepository.create({ ...note, user })
                const newNote = this.notesRepository.create(Object.assign({}, note));
                const savedNote = yield this.notesRepository.save(newNote);
                response.send(savedNote);
            }
        });
        this.editNote = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const noteFromRequest = request.body;
            const { user } = request;
            if (user) {
                const note = yield this.notesRepository.findOne(noteFromRequest.id);
                if (note) {
                    this.notesRepository.merge(note, noteFromRequest);
                    const savedNote = yield this.notesRepository.save(note);
                    response.send(savedNote);
                }
                else {
                    next(new Middleware_1.EditNoteUnsuccessfulException());
                }
            }
            else {
                next(new Middleware_1.EditNoteUnsuccessfulException());
            }
        });
        this.deleteNote = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const noteIDFromRequest = request.body.id;
            const { user } = request;
            if (user) {
                const results = yield this.notesRepository.delete(noteIDFromRequest);
                if (results.raw[1]) {
                    response.send(results);
                }
                else {
                    next(new Middleware_1.DeleteNoteUnsuccessfulException());
                }
            }
            else {
                next(new Middleware_1.DeleteNoteUnsuccessfulException());
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}`, Middleware_1.authMiddleware, this.getAllNotes);
        this.router.post(`${this.path}`, Middleware_1.authMiddleware, this.createNote);
        this.router.put(`${this.path}`, Middleware_1.authMiddleware, this.editNote);
        this.router.delete(`${this.path}`, Middleware_1.authMiddleware, this.deleteNote);
    }
}
exports.NotesController = NotesController;
//# sourceMappingURL=Notes.js.map