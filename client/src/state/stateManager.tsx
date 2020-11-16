import React from 'react'
import { UserProvider } from './userState'
import { NotesProvider } from './notesState'
import { AppProvider } from './appState'
import { ItineraryProvider } from './itineraryState'

export const StateManager: React.FC = ({ children }) => {
  return (
    <UserProvider>
      <NotesProvider>
        <ItineraryProvider>
          <AppProvider>
            { children }
          </AppProvider>
        </ItineraryProvider>
      </NotesProvider>
    </UserProvider>   
  )
}