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
class NotesController {
    constructor() {
        this.path = '/notes';
        this.router = express.Router();
        this.notes = Models_1.noteModel;
        this.getAllNotes = (request, response) => {
            if (request.user) {
                // constrain this to reasonable dates at some point
                this.notes.find({ _id: { $in: request.user.noteIds } }).then((notes) => {
                    response.send(notes);
                });
            }
        };
        this.createNote = (request, response) => {
            const note = request.body;
            const { user } = request;
            if (user) {
                note.authorId = user._id;
                const createdNote = new Models_1.noteModel(note);
                const notePromise = createdNote.save();
                user.noteIds.push(createdNote._id);
                const userPromise = user.save();
                Promise.all([notePromise, userPromise]).then(([savedNote]) => {
                    response.send(savedNote);
                });
            }
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}`, Middleware_1.authMiddleware, this.getAllNotes);
        this.router.post(`${this.path}`, Middleware_1.authMiddleware, this.createNote);
    }
}
exports.NotesController = NotesController;
//# sourceMappingURL=Notes.js.map