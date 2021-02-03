export interface Itinerary {
  id: string,
  authorId: string,
  tripLegs: TripLeg[],
  notes: string,
  title: string
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