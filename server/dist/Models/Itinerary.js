"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.itinerarySchema = new mongoose_1.default.Schema({
    authorId: String,
    _id: String,
    tripLegs: [{
            origin: { lat: Number, lng: Number },
            destination: { lat: Number, lng: Number },
            distance: String,
            time: String,
            overviewPolyline: String,
            arrivalDate: Date,
            departureDate: Date
        }]
});
exports.itineraryModel = mongoose_1.default.model('Itinerary', exports.itinerarySchema);
//# sourceMappingURL=Itinerary.js.map