import axios, { AxiosResponse } from 'axios'
import { INote } from '../state/notesState'
import { getAuthHeader } from './authService'

const BASE_NOTES_PATH = 'api/notes'


export const getNotes = () => {
  return axios.get(BASE_NOTES_PATH, { headers: getAuthHeader() }).then((response: AxiosResponse<INote[]>) => {
    return response.data
  })
}

export const saveNote = (note: INote) => {
  return axios.post(BASE_NOTES_PATH, note, { headers: getAuthHeader() }).then((response : AxiosResponse<INote>) => {
    return response.data
  })
}
