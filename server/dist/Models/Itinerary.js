"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tripLegSchema = new mongoose_1.default.Schema({
    origin: { lat: Number, lng: Number, name: String },
    destination: { lat: Number, lng: Number, name: String },
    distance: String,
    time: String,
    overviewPolyline: String,
    arrivalDate: Date,
    departureDate: Date
}, { _id: false });
exports.itinerarySchema = new mongoose_1.default.Schema({
    authorId: String,
    tripLegs: [tripLegSchema],
    title: String,
    notes: String
});
exports.itineraryModel = mongoose_1.default.model('Itinerary', exports.itinerarySchema);
//# sourceMappingURL=Itinerary.js.map