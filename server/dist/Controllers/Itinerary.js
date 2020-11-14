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
        this.getAllItins = (request, response) => {
            if (request.user) {
                this.itinerary.find({ _id: { $in: request.user.itineraryIds } }).then((itineraries) => {
                    response.send(itineraries);
                });
            }
        };
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}`, Middleware_1.authMiddleware, this.getAllItins);
    }
}
exports.ItineraryController = ItineraryController;
//# sourceMappingURL=Itinerary.js.map