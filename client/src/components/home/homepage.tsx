import React, { useContext, useEffect } from 'react'
import { Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { Sidebar } from '../sidebar/sidebar'
import { VanCalendar } from '../calendar/calendar'
import { NoteContext } from '../../state/notesState';
import { getNotes } from '../../services/noteService'
import { saveNotes } from '../../actions/notesActions';
import { StickyNotes } from '../stickyNotes/stickyNotes'
import { PrivateRoute } from '../routes/privateRoute';
import { CreateNote } from '../stickyNotes/createNote'

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
    }
  })
) 

const MainPage = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.calendarRoot}>
        <VanCalendar />
      </div>
      <StickyNotes />
    </>
  )
}

export const HomePage = () => {
  const classes = useStyles()
  const { notesDispatch } = useContext(NoteContext)

  useEffect(() => {
    
    getNotes().then((notes) => {
      notesDispatch(saveNotes(notes))
    })
  }, [notesDispatch])



  return (
    <div className={classes.homepage}>
      <Sidebar />
      <div className={classes.mainContent}>
        <Switch>
          <PrivateRoute path='/home'> <MainPage /></PrivateRoute>
          <PrivateRoute path='/home/createNote'><CreateNote/></PrivateRoute>
        </Switch>
      </div>
    </div>
  )
}