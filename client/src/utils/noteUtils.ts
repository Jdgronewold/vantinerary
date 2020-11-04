import { INote } from '../state/notesState'
import moment from 'moment'

const defaultNote = {
  body: '',
  title: '',
  location: '',
}

export const createNote = (noteData: Partial<INote> ): INote => {
  return {
    ...defaultNote,
    ...noteData
  }
}

export const formatDate = (date: Date): string => {
  return moment(date).format('MM-DD-YYYY')
}