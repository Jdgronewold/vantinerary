"use strict";
// import mongoose from 'mongoose';
// import { INote } from '../Types'
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
// const noteSchema = new mongoose.Schema({
//   authorId: String,
//   body: String,
//   title: String,
//   date: Date,
//   location: String,
//   showOnCalendar: Boolean,
//   tag: Object
// });
// export const noteModel = mongoose.model<INote & mongoose.Document>('Note', noteSchema)
let NoteEntity = class NoteEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], NoteEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], NoteEntity.prototype, "body", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], NoteEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], NoteEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], NoteEntity.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], NoteEntity.prototype, "showOnCalendar", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_entity_1.UserEntity, user => user.notes, { cascade: true }),
    __metadata("design:type", User_entity_1.UserEntity)
], NoteEntity.prototype, "user", void 0);
NoteEntity = __decorate([
    typeorm_1.Entity()
], NoteEntity);
exports.NoteEntity = NoteEntity;
//# sourceMappingURL=Note.entity.js.map