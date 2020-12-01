import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { useForm } from "react-hook-form"
import { ItineraryContext, Location } from '../../state'
import { saveItinerary } from '../../actions'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'
import { CreateTripLeg } from './createTripLeg'


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

interface MapMarkerState {
  origin: google.maps.places.PlaceResult
  destination: google.maps.places.PlaceResult
}

export interface MapMarkerContextType extends MapMarkerState {
  setPlace: (place: Partial<MapMarkerState>) => void
}

export const MapMarkerContext = React.createContext<MapMarkerContextType>({
  origin: null,
  destination: null,
  setPlace: () => {}
}) 

interface ItineraryData {
  origin?: Location,
  destination?: Location,
  distance: string,
  time: string,
  overviewPolyline: string,
  startDate: Date,
  endDate: Date
}

export const CreateItinerary = () => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const { itineraryDispatch } = useContext(ItineraryContext)  
  const [mapMarkerState, setMapMarkerState] = useState<MapMarkerState>({
    origin: null,
    destination: null
  })

  const saveForm = (itineraryData: ItineraryData) => {
    console.log(itineraryData);
  }

  const setPlace = (place: Partial<MapMarkerState>) => {
    setMapMarkerState({
      ...mapMarkerState,
      ...place
    })
  }

  
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
          <Grid item xs={10}>
            <Typography component="h2" variant="h6">
              Create a trip segment
            </Typography>
          </Grid>
          <MapMarkerContext.Provider value={{ ...mapMarkerState, setPlace }}>
            <CreateTripLeg register={register} />
          </MapMarkerContext.Provider>
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