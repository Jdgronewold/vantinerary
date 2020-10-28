"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    authorId: String,
    body: String,
    title: String,
    date: Date,
    location: String,
    showOnCalendar: Boolean,
    tag: Object
});
exports.noteModel = mongoose_1.default.model('Note', noteSchema);
//# sourceMappingURL=Notes.js.map