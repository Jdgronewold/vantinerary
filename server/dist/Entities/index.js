"use strict";
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
let UserEntity = class UserEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(() => ItineraryEntity, itinerary => itinerary.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "itineraries", void 0);
__decorate([
    typeorm_1.OneToMany(() => NoteEntity, note => note.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "notes", void 0);
UserEntity = __decorate([
    typeorm_1.Entity()
], UserEntity);
exports.UserEntity = UserEntity;
let ItineraryEntity = class ItineraryEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], ItineraryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => TripLegEntity, tripLeg => tripLeg.itinerary, { cascade: true }),
    __metadata("design:type", Array)
], ItineraryEntity.prototype, "tripLegs", void 0);
__decorate([
    typeorm_1.ManyToOne(() => UserEntity, user => user.itineraries, { cascade: ["insert" || "update"] }),
    __metadata("design:type", UserEntity)
], ItineraryEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ItineraryEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ItineraryEntity.prototype, "notes", void 0);
ItineraryEntity = __decorate([
    typeorm_1.Entity()
], ItineraryEntity);
exports.ItineraryEntity = ItineraryEntity;
let TripLegEntity = class TripLegEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], TripLegEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripLegEntity.prototype, "distance", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripLegEntity.prototype, "time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TripLegEntity.prototype, "overviewPolyline", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], TripLegEntity.prototype, "arrivalDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], TripLegEntity.prototype, "departureDate", void 0);
__decorate([
    typeorm_1.Column("simple-json"),
    __metadata("design:type", Object)
], TripLegEntity.prototype, "origin", void 0);
__decorate([
    typeorm_1.Column("simple-json"),
    __metadata("design:type", Object)
], TripLegEntity.prototype, "destination", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ItineraryEntity, itinerary => itinerary.tripLegs),
    __metadata("design:type", ItineraryEntity)
], TripLegEntity.prototype, "itinerary", void 0);
TripLegEntity = __decorate([
    typeorm_1.Entity()
], TripLegEntity);
exports.TripLegEntity = TripLegEntity;
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
    typeorm_1.ManyToOne(() => UserEntity, user => user.notes, { cascade: ["insert" || "update"] }),
    __metadata("design:type", UserEntity)
], NoteEntity.prototype, "user", void 0);
NoteEntity = __decorate([
    typeorm_1.Entity()
], NoteEntity);
exports.NoteEntity = NoteEntity;
//# sourceMappingURL=index.js.map