import { UserEntity } from "Entities";

export interface Itinerary {
  id: string,
  tripLegs: TripLeg[],
  notes: string,
  title: string,
  user?: UserEntity
}

export interface TripLeg {
  origin: Coords,
  destination: Coords,
  distance: string,
  time: string,
  overviewPolyline: string,
  arrivalDate: Date,
  departureDate: Date
  id: string
}

export interface Coords {
  lat: number,
  lng: number
}