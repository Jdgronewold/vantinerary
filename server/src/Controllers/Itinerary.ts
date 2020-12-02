import * as express from 'express';
import { itineraryModel } from '../Models'
import { IController, Itinerary, IRequestWithUser } from '../Types'
import { authMiddleware } from '../Middleware'

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
        console.log('');
        console.log('');
        console.log(itinerary);
        
        itinerary.authorId = user._id
        console.log('');
        console.log('');
        const createdItinerary = new itineraryModel(itinerary)
        
        console.log(createdItinerary);
        console.log('');
        console.log('');
        
        const itineraryPromise = createdItinerary.save()
        user.itineraryIds.push(createdItinerary._id)
        const userPromise = user.save()

        
        
        Promise.all([itineraryPromise, userPromise]).then(([savedItinerary]) => {
            response.send(savedItinerary)
        })
      }
    }
}