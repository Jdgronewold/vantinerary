import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils';
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({}))

export const CreateItinerary = () => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const { notesDispatch } = useContext(NoteContext)
  
  const location = history.location as Location<HistoryState>
  const defaultDate = location.state?.date ? new Date(location.state.date) : new Date()  

  const saveForm = (noteData: NoteData) => {
  
    const note = createNote({
      ...noteData,
      date: defaultDate,
    })

    saveNote(note).then((value: INote) => {
      notesDispatch(saveNoteAction(value))
      history.push('/home')
    })
  }
  
  return (
    <div className={classes.createNote}>
      <Typography component="h2" variant="h4">
          Create A Note
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
                    defaultChecked={true}
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
          Create Note
        </Button>
      </form>
    </div>
    
  )
}