import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { useForm } from "react-hook-form"
import { ItineraryContext, Coords } from '../../state'
import { saveItinerary } from '../../actions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'


const useStyles = makeStyles((theme) => ({
  itineraryRoot: {
    padding: theme.spacing(2)
  },
  createItineraryForm: {
    paddingTop: theme.spacing(2)
  },
  dateForm: {
    paddingLeft: 8,
    ...flexStyles({justifyContent: 'flex-start'})
  },
  dateFieldContainer: {
    margin: 0,
    justifyContent: 'space-between'
  },
  dateField: {
    paddingLeft: theme.spacing(2)
  },
  bodyStyle: {
    height: 400
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface ItineraryData {
  origin: Coords,
  destination: Coords,
  distance: string,
  time: string,
  overviewPolyline: string,
  arrivalDate: Date,
  departureDate: Date
}

export const CreateItinerary = () => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const { itineraryDispatch } = useContext(ItineraryContext)  

  const saveForm = (itineraryData: ItineraryData) => {
  
  }

  const defaultDate = new Date()  
  
  return (
    <div className={classes.itineraryRoot}>
      <Typography component="h2" variant="h4">
          Create An Itinerary
        </Typography>
      <form onSubmit={handleSubmit(saveForm)} className={classes.createItineraryForm}>
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
              <FormControlLabel
                control={
                    <TextField
                    variant="outlined"
                    inputRef={register}
                    name="date"
                    defaultValue={moment(defaultDate).format('YYYY-MM-DD')}
                    type="date"
                    id="date"
                    className={classes.dateField}
                  />
                }
                label="Start Date"
                labelPlacement='start'
                classes={{ root: classes.dateFieldContainer }}
                />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                    <TextField
                    variant="outlined"
                    inputRef={register}
                    name="date"
                    defaultValue={moment(defaultDate).format('YYYY-MM-DD')}
                    type="date"
                    id="date"
                    className={classes.dateField}
                  />
                }
                label="End Date"
                labelPlacement='start'
                classes={{ root: classes.dateFieldContainer }}
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
          Create Itinerary
        </Button>
      </form>
    </div>
    
  )
}