import axios, { AxiosResponse } from 'axios'
import { Itinerary } from '../state'
import { getAuthHeader } from './authService'

const BASE_PATH = 'api/itinerary'

export const saveItinerary = (newItinerary: Itinerary): Promise<Itinerary> => {
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

export const deleteItinerary = (itineraryId: string) => {
  return axios({
    url: BASE_PATH,
    method: 'DELETE',
    headers: getAuthHeader(),
    data: { id: itineraryId}
  })
  .then((response: AxiosResponse<Itinerary>) => {
    return response.data
  })
}

export const editItinerary = (itinerary: Itinerary): Promise<Itinerary> => {
  return axios.put(BASE_PATH, itinerary, { headers: getAuthHeader() }).then((response : AxiosResponse<Itinerary>) => {
    return {
      ...response.data
    }
  })
}

