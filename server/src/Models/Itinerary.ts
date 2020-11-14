import mongoose from 'mongoose';
import { Itinerary } from '../Types/Itinerary'

export const itinerarySchema = new mongoose.Schema({
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
})

export const itineraryModel = mongoose.model<Itinerary & mongoose.Document>('Itinerary', itinerarySchema)