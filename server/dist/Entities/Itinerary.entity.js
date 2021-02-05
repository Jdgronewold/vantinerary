"use strict";
// import mongoose from 'mongoose';
// import { Itinerary } from '../Types/Itinerary'
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
const TripLeg_entity_1 = require("./TripLeg.entity");
// const tripLegSchema = new mongoose.Schema({
//   origin: { lat: Number, lng: Number, name: String },
//   destination: { lat: Number, lng: Number, name: String },
//   distance: String,
//   time: String,
//   overviewPolyline: String,
//   arrivalDate: Date,
//   departureDate: Date
// }, {_id: false})
// export const itinerarySchema = new mongoose.Schema<Itinerary>({
//   authorId: String,
//   tripLegs: [tripLegSchema],
//   title: String,
//   notes: String
// })
// export const itineraryModel = mongoose.model<Itinerary & mongoose.Document>('Itinerary', itinerarySchema)
let ItineraryEntity = class ItineraryEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], ItineraryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => TripLeg_entity_1.TripLegEntity, tripLeg => tripLeg.itinerary, { cascade: true }),
    __metadata("design:type", Array)
], ItineraryEntity.prototype, "tripLegs", void 0);
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
//# sourceMappingURL=Itinerary.entity.js.map