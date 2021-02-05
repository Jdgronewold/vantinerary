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
const Itinerary_entity_1 = require("./Itinerary.entity");
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
    typeorm_1.ManyToOne(() => Itinerary_entity_1.ItineraryEntity, itinerary => itinerary.tripLegs),
    __metadata("design:type", Itinerary_entity_1.ItineraryEntity)
], TripLegEntity.prototype, "itinerary", void 0);
TripLegEntity = __decorate([
    typeorm_1.Entity()
], TripLegEntity);
exports.TripLegEntity = TripLegEntity;
//# sourceMappingURL=TripLeg.entity.js.map