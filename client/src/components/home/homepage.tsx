import React, { useContext, useEffect } from 'react'
import { Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { VanCalendar } from '../calendar/calendar'
import { NoteContext } from '../../state/notesState';
import { getNotes } from '../../services/noteService'
import { saveNotes } from '../../actions/notesActions';
import { StickyNotes } from '../stickyNotes/stickyNotes'
import { PrivateRoute } from '../routes/privateRoute';
import { CreateNote } from '../stickyNotes/createNote'
import { EditNote } from '../stickyNotes/editNote'
import { DisplayNote } from '../stickyNotes/displayNote';
import { AppContext, ItineraryContext } from '../../state';
import { Map } from '../map/map'
import { CreateAndEditItinerary } from '../itinerary/createAndEditItinerary'
import { fetchItineraries } from '../../services/itineraryService';
import { saveItineraries } from '../../actions'

const useStyles = makeStyles((theme) => ({
    homepage: {
      width: '100vw',
      height: 'calc(100vh - 64px)', // also set in the splash page
      ...flexStyles({ alignItems: 'flex-start'})
    },
    mainContent: {
      flex: 1,
      height: '100%',
    },
    calendarRoot: {
      height: '50%',
      paddingTop: theme.spacing(3),
      ...flexStyles({})
    },
    mapRoot: {
      height: `calc(50% - ${theme.spacing(1)}px)`,
      width: '100%',
      ...flexStyles({ justifyContent: 'flex-end'}),
    }
  })
) 

const MainCalendarPage = () => {
  const classes = useStyles()
  const { currentNote, notesDispatch } = useContext(NoteContext)

  return (
    <>
      <div className={classes.calendarRoot}>
        <VanCalendar />
      </div>
      {
        currentNote ?
        <DisplayNote /> :
        <StickyNotes />
      }
    </>
  )
}

const MainMapPage = () => {
  const classes = useStyles()
  const { currentItinerary } = useContext(ItineraryContext)

  return (
    <div className={classes.mapRoot}>
      <Map itinerary={currentItinerary} shouldShowPlanner={true} />
    </div>
    
  )
}

export const HomePage = () => {
  const classes = useStyles()
  const { mainView } = useContext(AppContext)
  const { notesDispatch } = useContext(NoteContext)
  const { itineraryDispatch } = useContext(ItineraryContext)

  useEffect(() => {
    fetchItineraries().then((itiniraries) => {
      itineraryDispatch(saveItineraries(itiniraries))
    })

    getNotes().then((notes) => {
      notesDispatch(saveNotes(notes))
    })
  }, [])

  return (
    <div className={classes.homepage}>
      <div className={classes.mainContent}>
        <Switch>
          <PrivateRoute exact path='/home'>
            {
              mainView === 'calendar' ?
              <MainCalendarPage /> :
              <MainMapPage />
            }
          </PrivateRoute>
          <PrivateRoute path='/home/createNote'><CreateNote/></PrivateRoute>
          <PrivateRoute path='/home/createItinerary'> <CreateAndEditItinerary isEditing={false} /> </PrivateRoute>
          <PrivateRoute path='/home/editItinerary'> <CreateAndEditItinerary isEditing={true} /> </PrivateRoute>
          <PrivateRoute path='/home/editNote'><EditNote/></PrivateRoute>
        </Switch>
      </div>
    </div>
  )
}