import React, { useReducer, useState, useEffect } from 'react'
import { ItineraryActions, ItineraryActionTypes } from '../actions'

export interface Itinerary {
  _id: string,
  authorId: string,
  tripLegs: TripLeg[],
  title: string,
  notes: string
}

export interface TripLeg {
  origin: Location,
  destination: Location,
  distance?: string,
  time?: string,
  overviewPolyline?: string,
  arrivalDate?: Date,
  departureDate?: Date
}

export interface Location extends Coords {
  name: string
}

export interface Coords {
  lat: number,
  lng: number
}

interface ItineraryState {
  itineraries: Itinerary[],
  currentItinerary: Itinerary
}

type ItineraryContextType = {
  itineraries: Itinerary[],
  currentItinerary: Itinerary | null,
  itineraryDispatch: React.Dispatch<ItineraryActions>
}

export const ItineraryContext = React.createContext<ItineraryContextType>({
  itineraries: [],
  currentItinerary:  null,
  itineraryDispatch: () => {}
})

function itineraryReducer(state: ItineraryState, action: ItineraryActions): ItineraryState {
  switch(action.type) {
    case ItineraryActionTypes.SAVE_ITINERARIES: {
      return { itineraries: action.payload, currentItinerary:  null }
    }
    case ItineraryActionTypes.SAVE_ITINERARY: {
      const itineraries = state.itineraries.slice()
      itineraries.push(action.payload)
      return { itineraries, currentItinerary:  null }
    }
    default:
      return state
  }
}

export const ItineraryProvider: React.FunctionComponent = ({ children }) => {
  const [ { itineraries, currentItinerary }, itineraryDispatch] = useReducer(itineraryReducer, { itineraries: [], currentItinerary: null })
  const [contextValue, setContext] = useState<ItineraryContextType>({ itineraries, itineraryDispatch, currentItinerary: null })

  useEffect(() => {
    setContext((contextValue: ItineraryContextType) => ({
      ...contextValue,
      itineraries,
      currentItinerary
    }))
  }, [itineraries, currentItinerary])

  return (
    <ItineraryContext.Provider value={contextValue}>
      { children }
    </ItineraryContext.Provider>
  )
}