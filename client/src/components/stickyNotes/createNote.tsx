import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { useForm } from "react-hook-form";
import { saveNote } from '../../services/noteService' 
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  createNoteForm: {
    padding: 15
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

export const CreateNote = () => {
  const classes = useStyles()
  const { register, handleSubmit, getValues } = useForm()
  const saveForm = () => {

  }


  return (
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
              defaultValue={moment().format('YYYY-MM-DD')}
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
  )
}