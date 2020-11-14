export interface Itinerary {
  _id: string,
  authorId: string,
  tripLegs: tripLeg[]
}

export interface tripLeg {
  origin: Coords,
  destination: Coords,
  distance: string,
  time: string,
  overviewPolyline: string,
  arrivalDate: Date,
  departureDate: Date
}

export interface Coords {
  lat: number,
  lng: number
}