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
                console.log('');
                console.log('');
                console.log(itinerary);
                itinerary.authorId = user._id;
                console.log('');
                console.log('');
                const createdItinerary = new Models_1.itineraryModel(itinerary);
                console.log(createdItinerary);
                console.log('');
                console.log('');
                const itineraryPromise = createdItinerary.save();
                user.itineraryIds.push(createdItinerary._id);
                const userPromise = user.save();
                Promise.all([itineraryPromise, userPromise]).then(([savedItinerary]) => {
                    response.send(savedItinerary);
                });
            }
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}`, Middleware_1.authMiddleware, this.getAllItineraries);
        this.router.post(`${this.path}`, Middleware_1.authMiddleware, this.createItinerary);
    }
}
exports.ItineraryController = ItineraryController;
//# sourceMappingURL=Itinerary.js.map