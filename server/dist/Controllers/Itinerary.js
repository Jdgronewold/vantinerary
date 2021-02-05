"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Middleware_1 = require("../Middleware");
const typeorm_1 = require("typeorm");
const Itinerary_entity_1 = require("../Entities/Itinerary.entity");
class ItineraryController {
    constructor() {
        this.path = '/itinerary';
        this.router = express.Router();
        this.itineraryRepository = typeorm_1.getRepository(Itinerary_entity_1.ItineraryEntity);
        this.tripLegRepository = typeorm_1.getRepository(Itinerary_entity_1.TripLegEntity);
        this.getAllItineraries = (request, response) => {
            if (request.user) {
                this.itineraryRepository.find({ where: { user: request.user } }).then((itineraries) => {
                    response.send(itineraries);
                });
            }
        };
        this.editItinerary = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const itineraryFromRequest = request.body;
            const { user } = request;
            if (user) {
                const itinerary = yield this.itineraryRepository.findOne(itineraryFromRequest.id, { relations: ['tripLegs'] });
                // const newTripLegs: TripLegEntity[] = itineraryFromRequest.tripLegs.map((tripLeg: TripLeg) => {
                //   const tripLegIndex = itinerary?.tripLegs.findIndex((tripLegEntity: TripLegEntity) => { tripLegEntity.id === tripLeg.id })
                //   if (tripLegIndex && itinerary?.tripLegs[tripLegIndex]) {
                //     return itinerary?.tripLegs[tripLegIndex]
                //   }
                //   const createdTripLeg = this.tripLegRepository.create(tripLeg)
                //   return createdTripLeg
                // })
                if (itinerary) {
                    this.itineraryRepository.merge(itinerary, Object.assign({}, itineraryFromRequest));
                    const results = yield this.itineraryRepository.save(itinerary);
                    response.send(results);
                }
                else {
                    next(new Middleware_1.EditItineraryUnsuccessfulException());
                }
            }
            else {
                next(new Middleware_1.EditItineraryUnsuccessfulException());
            }
        });
        this.createItinerary = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const itinerary = request.body;
            const { user } = request;
            if (user) {
                const createdItinerary = this.itineraryRepository.create(itinerary);
                const savedItinerary = yield this.itineraryRepository.save(createdItinerary);
                response.send(savedItinerary);
            }
        });
        this.deleteItinerary = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const itineraryIDFromRequest = request.body.id;
            const { user } = request;
            if (user) {
                const results = yield this.itineraryRepository.delete(itineraryIDFromRequest);
                if (results.raw[1]) {
                    response.send(results);
                }
                else {
                    next(new Middleware_1.DeleteItineraryUnsuccessfulException());
                }
            }
            else {
                next(new Middleware_1.DeleteItineraryUnsuccessfulException());
            }
        });
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