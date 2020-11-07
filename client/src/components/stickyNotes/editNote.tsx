import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { useForm } from "react-hook-form";
import { editNote } from '../../services/noteService' 
import { createNote } from '../../utils/noteUtils'
import { useHistory, RouteProps } from 'react-router-dom'
import { editNote as editNoteAction } from '../../actions/notesActions'
import { INote, NoteContext } from '../../state/notesState'
import { Location } from 'history';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  createNote: {
    padding: 15
  },
  createNoteForm: {
    paddingTop: 15
  },
  dateForm: {
    paddingLeft: 8,
    ...flexStyles({justifyContent: 'flex-start'})
  },
  bodyStyle: {
    height: 400
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface NoteData {
  body: string,
  date: string,
  title: string,
  showOnCalendar: boolean
}

interface HistoryState { date : Date } 

export const EditNote: React.FC<RouteProps> = (props) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const { currentNote, notesDispatch } = useContext(NoteContext)

  if (!currentNote) {
    history.push('/home')
    return null
  }
  
  const defaultDate = currentNote.date || null

  const saveForm = (noteData: NoteData) => {
    const newDate = new Date(noteData.date)
    const note = createNote({
      ...currentNote,
      ...noteData,
      date: newDate,
    })

    editNote(note).then((value: INote) => {
      notesDispatch(editNoteAction(value))
      history.push('/home')
    })
  }
  
  return (
    <div className={classes.createNote}>
      <Typography component="h2" variant="h4">
          Edit Note
        </Typography>
      <form onSubmit={handleSubmit(saveForm)} className={classes.createNoteForm}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              id="title"
              label="Title (optional)"
              inputRef={register}
              name="title"
              defaultValue={currentNote.title}
            />
          </Grid>
          <Grid container className={classes.dateForm}>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                inputRef={register}
                name="date"
                defaultValue={moment(defaultDate).format('YYYY-MM-DD')}
                type="date"
                id="date"
              />
            </Grid>
            <Grid item xs={6} >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={currentNote.showOnCalendar}
                    inputRef={register}
                    name="showOnCalendar"
                    color="primary"
                  />
                }
                label="Show on Calendar"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              inputRef={register}
              name="body"
              label="Leave a note here..."
              type="text"
              id="body"
              rows={15}
              multiline
              defaultValue={currentNote.body}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Edit Note
        </Button>
      </form>
    </div>
    
  )
}