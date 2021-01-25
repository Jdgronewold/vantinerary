import * as express from 'express';
import { itineraryModel } from '../Models'
import { IController, Itinerary, IRequestWithUser } from '../Types'
import { authMiddleware , DeleteItineraryUnsuccessfulException, EditItineraryUnsuccessfulException} from '../Middleware'

export class ItineraryController implements IController {
    public path = '/itinerary'
    public router = express.Router()
    private itinerary = itineraryModel
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.getAllItineraries)
      this.router.post(`${this.path}`, authMiddleware, this.createItinerary)
      this.router.delete(`${this.path}`, authMiddleware, this.deleteItinerary)
      this.router.put(`${this.path}`, authMiddleware, this.editItinerary)
    }

    getAllItineraries = (request: IRequestWithUser, response: express.Response) => {
      if (request.user) {
        this.itinerary.find({_id: { $in : request.user.itineraryIds } }).then((itineraries: Itinerary[]) => {
          response.send(itineraries)
        })
      }
    }

    createItinerary = (request: IRequestWithUser, response: express.Response) => {
      const itinerary: Itinerary = request.body
      const { user } = request
      if (user) {
  
        itinerary.authorId = user._id
        const createdItinerary = new itineraryModel(itinerary)
        
        const itineraryPromise = createdItinerary.save()
        user.itineraryIds.push(createdItinerary._id)
        const userPromise = user.save()

        
        
        Promise.all([itineraryPromise, userPromise]).then(([savedItinerary]) => {
            response.send(savedItinerary)
        })
      }
    }

    editItinerary = (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const itineraryFromRequest: Itinerary = request.body
      const { user } = request
      if (user) {
        itineraryModel.findById(itineraryFromRequest._id, (err, itinerary) => {
          
          if (itinerary) {
            itinerary.notes = itineraryFromRequest.notes
            itinerary.tripLegs = itineraryFromRequest.tripLegs
            itinerary.title = itineraryFromRequest.title
            itinerary.save()
            response.send(itinerary)
          } else {
            next(new EditItineraryUnsuccessfulException())
          }
        })
      } else {
        next(new EditItineraryUnsuccessfulException())
      }
    }

    deleteItinerary = (request: IRequestWithUser, response: express.Response, next: express.NextFunction) => {
      const itineraryIDFromRequest: string = request.body.id
      const { user } = request
        
      if (user) {
        itineraryModel.findById(itineraryIDFromRequest, (err, itinerary) => {
            
          if (itinerary) {
            const itineraryPromise = itinerary.remove()
            const userItineraryIDIndex = user.itineraryIds.findIndex((itineraryID) => itineraryID === itineraryIDFromRequest)
            user.itineraryIds.splice(userItineraryIDIndex, 1)
            const userPromise = user.save()

            Promise.all([itineraryPromise, userPromise]).then(([deletedItinerary]) => {
              response.send(deletedItinerary)
            })
          } else {
            next(new DeleteItineraryUnsuccessfulException())
          }
        })
      } else {
        next(new DeleteItineraryUnsuccessfulException())
      }
        
    }
}