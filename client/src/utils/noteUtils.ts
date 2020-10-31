import { INote } from '../state/notesState'

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