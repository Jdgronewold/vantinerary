export interface Itinerary {
  _id: string,
  authorId: string,
  tripLegs: tripLeg[],
  notes: string,
  title: string
}

export interface tripLeg {
  origin: Coords,
  destination: Coords,
  distance: string,
  time: string,
  overviewPolyline: string,
  startDate: Date,
  endDate: Date
}

export interface Coords {
  lat: number,
  lng: number
}