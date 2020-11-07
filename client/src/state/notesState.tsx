import React, { useReducer, useState, useEffect } from 'react'
import { NotesActions, NotesActionTypes } from '../actions/notesActions'


export interface INote {
  authorId?: string
  body: string,
  title?: string,
  date?: Date,
  location?: string,
  showOnCalendar?: boolean,
  tag?: any,
  _id?: string
}

export interface NotesState {
  notes: INote[],
  currentNote: INote | null
}


type NoteContextType = {
  notes: INote[],
  currentNote: INote | null,
  notesDispatch: React.Dispatch<NotesActions>
}

export const NoteContext = React.createContext<NoteContextType>({
  notes: [],
  currentNote:  null,
  notesDispatch: () => {}
})

function notesReducer(state: NotesState, action: NotesActions): NotesState {
  switch(action.type) {
    case NotesActionTypes.SAVE_NOTES: {
      return { notes: action.payload, currentNote:  null }
    }
    case NotesActionTypes.SAVE_NOTE: {
      const notes = state.notes.slice()
      notes.push(action.payload)
      return { notes, currentNote:  null }
    }
    case NotesActionTypes.DELETE_NOTE: {
      const noteIndex = state.notes.findIndex((note: INote) => note._id = action.payload._id )
      const newNotes = state.notes.slice()
      newNotes.splice(noteIndex, 1)
      return { notes: newNotes, currentNote:  null }
    }
    case NotesActionTypes.SELECT_NOTE: {
      return {
        notes: state.notes,
        currentNote: action.payload
      }
    }
    default:
      return state
  }
}

export const NotesProvider: React.FunctionComponent = ({ children }) => {
  const [ { notes, currentNote }, notesDispatch] = useReducer(notesReducer, { notes: [], currentNote: null })
  const [contextValue, setContext] = useState<NoteContextType>({ notes, notesDispatch, currentNote: null })

  useEffect(() => {
    setContext((contextValue: NoteContextType) => ({
      ...contextValue,
      notes,
      currentNote
    }))
  }, [notes, currentNote])

  return (
    <NoteContext.Provider value={contextValue}>
      { children }
    </NoteContext.Provider>
  )
}



