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
  notes: INote[]
}


type NoteContextType = { notes: INote[], notesDispatch: React.Dispatch<NotesActions>}

export const NoteContext = React.createContext<NoteContextType>({ notes: [], notesDispatch: () => {}})

function notesReducer(state: NotesState, action: NotesActions): NotesState {
  switch(action.type) {
    case NotesActionTypes.SAVE_NOTES: {
      return { notes: action.payload }
    }
    case NotesActionTypes.SAVE_NOTE: {
      const notes = state.notes.slice()
      notes.push(action.payload)
      return { notes }
    }
    case NotesActionTypes.DELETE_NOTE: {
      const noteIndex = state.notes.findIndex((note: INote) => note._id = action.payload._id )
      return { notes: state.notes.splice(noteIndex, 1) }
    }
    default:
      return state
  }
}

export const NotesProvider: React.FunctionComponent = ({ children }) => {
  const [ { notes }, notesDispatch] = useReducer(notesReducer, { notes: [] })
  const [contextValue, setContext] = useState<NoteContextType>({ notes, notesDispatch })

  useEffect(() => {
    setContext((contextValue: NoteContextType) => ({
      ...contextValue,
      notes
    }))
  }, [notes])

  return (
    <NoteContext.Provider value={contextValue}>
      { children }
    </NoteContext.Provider>
  )
}



