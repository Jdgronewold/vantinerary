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
class ItineraryController {
    constructor() {
        this.path = '/itinerary';
        this.router = express.Router();
        this.itinerary = Models_1.itineraryModel;
        this.getAllItineraries = (request, response) => {
            if (request.user) {
                this.itinerary.find({ _id: { $in: request.user.itineraryIds } }).then((itineraries) => {
                    response.send(itineraries);
                });
            }
        };
        this.createItinerary = (request, response) => {
            const itinerary = request.body;
            const { user } = request;
            if (user) {
                itinerary.authorId = user._id;
                const createdItinerary = new Models_1.itineraryModel(itinerary);
                const itineraryPromise = createdItinerary.save();
                user.itineraryIds.push(createdItinerary._id);
                const userPromise = user.save();
                Promise.all([itineraryPromise, userPromise]).then(([savedItinerary]) => {
                    response.send(savedItinerary);
                });
            }
        };
        this.editItinerary = (request, response, next) => {
            const itineraryFromRequest = request.body;
            const { user } = request;
            if (user) {
                Models_1.itineraryModel.findById(itineraryFromRequest._id, (err, itinerary) => {
                    if (itinerary) {
                        itinerary.notes = itineraryFromRequest.notes;
                        itinerary.tripLegs = itineraryFromRequest.tripLegs;
                        itinerary.title = itineraryFromRequest.title;
                        itinerary.save();
                        response.send(itinerary);
                    }
                    else {
                        next(new Middleware_1.EditItineraryUnsuccessfulException());
                    }
                });
            }
            else {
                next(new Middleware_1.EditItineraryUnsuccessfulException());
            }
        };
        this.deleteItinerary = (request, response, next) => {
            const itineraryIDFromRequest = request.body.id;
            const { user } = request;
            if (user) {
                Models_1.itineraryModel.findById(itineraryIDFromRequest, (err, itinerary) => {
                    if (itinerary) {
                        const itineraryPromise = itinerary.remove();
                        const userItineraryIDIndex = user.itineraryIds.findIndex((itineraryID) => itineraryID === itineraryIDFromRequest);
                        user.itineraryIds.splice(userItineraryIDIndex, 1);
                        const userPromise = user.save();
                        Promise.all([itineraryPromise, userPromise]).then(([deletedItinerary]) => {
                            response.send(deletedItinerary);
                        });
                    }
                    else {
                        next(new Middleware_1.DeleteItineraryUnsuccessfulException());
                    }
                });
            }
            else {
                next(new Middleware_1.DeleteItineraryUnsuccessfulException());
            }
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}`, Middleware_1.authMiddleware, this.getAllItineraries);
        this.router.post(`${this.path}`, Middleware_1.authMiddleware, this.createItinerary);
        this.router.delete(`${this.path}`, Middleware_1.authMiddleware, this.deleteItinerary);
        this.router.put(`${this.path}`, Middleware_1.authMiddleware, this.editItinerary);
    }
}
exports.ItineraryController = ItineraryController;
//# sourceMappingURL=Itinerary.js.map