import { Itinerary } from "../state/itineraryState";
import { BaseAction } from "./generalActions";

export enum ItineraryActionTypes {
  SAVE_ITINERARIES = 'SAVE_ITINERARIES',
  SAVE_ITINERARY = 'SAVE_ITINERARY',
  DELETE_ITINERARY = 'DELETE_ITINERARY',
  SELECT_ITINERARY = 'SELECT_ITINERARY',
  EDIT_ITINERARY = 'EDIT_ITINERARY'
}


export interface SaveItineraryAction extends BaseAction<ItineraryActionTypes.SAVE_ITINERARY> {
  payload: Itinerary
}

export const saveItinerary = (itinerary: Itinerary): SaveItineraryAction => {
  return {
    type: ItineraryActionTypes.SAVE_ITINERARY,
    payload: itinerary
  }
}

export interface SaveIntinerariesAction extends BaseAction<ItineraryActionTypes.SAVE_ITINERARIES> {
  payload: Itinerary[]
}

export const saveItineraries = (itineraries: Itinerary[]): SaveIntinerariesAction => {
  return {
    type: ItineraryActionTypes.SAVE_ITINERARIES,
    payload: itineraries
  }
}

export interface SelectItinerary extends BaseAction<ItineraryActionTypes.SELECT_ITINERARY> {
  payload: Itinerary
}

export const selectItinerary = (itinerary: Itinerary): SelectItinerary => {
  return {
    type: ItineraryActionTypes.SELECT_ITINERARY,
    payload: itinerary
  }
}

export interface DeleteItineraryAction extends BaseAction<ItineraryActionTypes.DELETE_ITINERARY> {
  payload: string
}

export const deleteItinerary = (itineraryId: string): DeleteItineraryAction => {
  return {
    type: ItineraryActionTypes.DELETE_ITINERARY,
    payload: itineraryId
  }
}

interface EditItineraryAction extends BaseAction<ItineraryActionTypes.EDIT_ITINERARY> {
  payload: Itinerary
}

export const editItinerary = (itinerary: Itinerary): EditItineraryAction => {
  return {
    type: ItineraryActionTypes.EDIT_ITINERARY,
    payload: itinerary
  }
}

export type ItineraryActions =
SaveIntinerariesAction |
SaveItineraryAction |
SelectItinerary |
DeleteItineraryAction |
EditItineraryAction