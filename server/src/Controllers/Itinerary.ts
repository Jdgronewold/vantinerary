import * as express from 'express';
import { IController, Itinerary, IRequestWithUser, TripLeg } from '../Types'
import { authMiddleware , DeleteItineraryUnsuccessfulException, EditItineraryUnsuccessfulException} from '../Middleware'
import { getRepository } from 'typeorm';
import { ItineraryEntity, TripLegEntity } from '../Entities';

export class ItineraryController implements IController {
    public path = '/itinerary'
    public router = express.Router()
    private itineraryRepository = getRepository(ItineraryEntity)
    private tripLegRepository = getRepository(TripLegEntity)
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.getAllItineraries)
      this.router.post(`${this.path}`, authMiddleware, this.createItinerary)
      this.router.delete(`${this.path}`, authMiddleware, this.deleteItinerary)
      this.router.put(`${this.path}`, authMiddleware, this.editItinerary)
    }

    getAllItineraries = async (request: IRequestWithUser, response: express.Response) => {      
      if (request.user) {
        const itineraries: ItineraryEntity[] = await this.itineraryRepository.find({
          where: { user: request.user },
          relations: ['tripLegs']
        })
        console.log(itineraries);
        
        response.send(itineraries)
      }
    }

    editItinerary = async (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const itineraryFromRequest: Itinerary = request.body
      const { user } = request
      if (user) {
        const itinerary = await this.itineraryRepository.findOne(itineraryFromRequest.id, { relations: ['tripLegs']})

        const newTripLegs: TripLegEntity[] = itineraryFromRequest.tripLegs.map((tripLeg: TripLeg) => {
          if (itinerary && itinerary.tripLegs) {
            const tripLegIndex = itinerary.tripLegs.findIndex((tripLegEntity: TripLegEntity) => { tripLegEntity.id === tripLeg.id })
            if (tripLegIndex && itinerary.tripLegs[tripLegIndex]) {
              return itinerary.tripLegs[tripLegIndex]
            }
            const createdTripLeg = this.tripLegRepository.create(tripLeg)
            return createdTripLeg
          } else {
            const createdTripLeg = this.tripLegRepository.create(tripLeg)
            return createdTripLeg
          }
        })
          
        if (itinerary) {
          this.itineraryRepository.merge(itinerary, {
            ...itineraryFromRequest,
            tripLegs: newTripLegs
          })

          const results = await this.itineraryRepository.save(itinerary)
          response.send(results)
        } else {
          next(new EditItineraryUnsuccessfulException())
        }
      } else {
        next(new EditItineraryUnsuccessfulException())
      }
    }

    

    createItinerary = async (request: IRequestWithUser, response: express.Response) => {
      const itinerary: Itinerary = request.body
      const { user } = request
      if (user) {
        const newTripLegs: TripLegEntity[] = itinerary.tripLegs.map((tripLeg: TripLeg) => {
          return this.tripLegRepository.create(tripLeg)
        })
        
        const createdItinerary = this.itineraryRepository.create({ ...itinerary, tripLegs: newTripLegs, user })
        const savedItinerary = await this.itineraryRepository.save(createdItinerary)
        response.send(savedItinerary)
      }
    }

    deleteItinerary = async (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const itineraryIDFromRequest: string = request.body.id
      const { user } = request
      
      if (user) {
        const results = await this.itineraryRepository.delete(itineraryIDFromRequest)
        
        if (results.affected && results.affected > 0) {
          response.send({ id: itineraryIDFromRequest })
        } else {
          next(new DeleteItineraryUnsuccessfulException())
        }
      } else {
        next(new DeleteItineraryUnsuccessfulException())
      }
        
    }
}