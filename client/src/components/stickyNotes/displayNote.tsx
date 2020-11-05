import React, { useContext } from 'react'
import { NoteContext } from '../../state'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { formatDate } from '../../utils/noteUtils';
import { flexStyles } from '../../utils/styleUtils';
import { selectNote } from '../../actions/notesActions';

const useStyles = makeStyles((theme) => ({
  displayNoteRoot: {
    padding: theme.spacing(3),
    ...flexStyles({ flexDirection: 'column', alignItems: 'flex-start'})
  },
  displayNoteHeader: {
    ...flexStyles({ justifyContent: 'space-between' }),
    width: '100%'
  },
  headerReturn: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  displayNoteBody: {
    padding: `${theme.spacing(2)}px 0`
  }
}))

export const DisplayNote: React.FC<{}> = () => {
  const { currentNote, notesDispatch } = useContext(NoteContext)
  const classes = useStyles()

  const returnToNotes = () => {
    notesDispatch(selectNote(null))
  }

  return (
    <div className={classes.displayNoteRoot}>
      <div className={classes.displayNoteHeader}>
        <Typography component="h1" variant="h6">
          { currentNote.title || formatDate(currentNote.date) }
        </Typography>
        <Typography
          component="h2"
          variant="subtitle2"
          className={classes.headerReturn}
          onClick={returnToNotes}
        >
          Return to all notes
        </Typography>
      </div>
      <div className={classes.displayNoteBody}>
        { currentNote.body }
      </div>
    </div>
  )
}