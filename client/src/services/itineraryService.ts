import axios, { AxiosResponse } from 'axios'
import { Itinerary } from '../state'
import { getAuthHeader } from './authService'

const BASE_PATH = 'api/itinerary'

export const saveItinerary = (newItinerary: Itinerary) => {
  return axios.post(BASE_PATH, newItinerary, { headers: getAuthHeader() })
    .then((response : AxiosResponse<Itinerary>) => {
    return {
      ...response.data
    }
  })
}

export const fetchItineraries = (): Promise<Itinerary[]> => {
  return axios.get(BASE_PATH, { headers: getAuthHeader() }).then((response: AxiosResponse<Itinerary[]>) => {
    return response.data
  })
}

