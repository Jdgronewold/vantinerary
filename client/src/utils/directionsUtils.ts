import { Itinerary, Location, TripLeg } from "../state";

export const convertDirectionResult = (result: google.maps.DirectionsResult, partialTripLeg: TripLeg): TripLeg => {
  const route: google.maps.DirectionsRoute = result.routes[0]
  const leg = route.legs[0]
  return {
    // origin: {
    //   lat: leg.start_location.lat(),
    //   lng: leg.start_location.lng(),
    //   name: origin.name
    // },
    // destination: {
    //   lat: leg.end_location.lat(),
    //   lng: leg.end_location.lng(),
    //   name: destination.name
    // },
    ...partialTripLeg,
    distance: leg.distance.text,
    time: leg.duration.text,
    overviewPolyline: route.overview_polyline
  }
}

export const convertPlaceToLocation = (place: google.maps.places.PlaceResult): Location => {
  return {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
    name: place.name
  }
}

export const createItinerary = (partialItinerary: Partial<Itinerary>): Itinerary => {
  return {
    authorId: '',
    tripLegs: [],
    title: '',
    notes: '',
    ...partialItinerary
  }
}

export const mapColorArray = [
  'red', 'blue', 'aqua', 'darkviolet',
  'forestgreen', 'salmon', 'firebrick',
  'darkblue', 'forestgreen', 'darkmagenta',
  'crimson', 'blueviolet', 'hotpink' 
]