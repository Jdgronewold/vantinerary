import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { useForm } from "react-hook-form"
import { Itinerary, ItineraryContext, Location, TripLeg } from '../../state'
import { saveItinerary as storeItinerary, selectItinerary} from '../../actions'
import { saveItinerary } from '../../services/itineraryService'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { CreateTripLeg } from './createTripLeg'
import { useHistory } from 'react-router-dom'
import { createItinerary } from '../../utils/directionsUtils'


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
  editedTripLeg: TripLeg
}

export interface MapContextType extends MapMarkerState {
  setMapContext: (place: Partial<MapMarkerState>) => void
}

export const MapMarkerContext = React.createContext<MapContextType>({
  origin: null,
  destination: null,
  editedTripLeg: null,
  setMapContext: () => {}
}) 

interface ItineraryData {
  title: string,
  startDate: Date,
  endDate: Date,
  notes: string
}

export const CreateItinerary = () => {
  const classes = useStyles()
  const { register, handleSubmit, watch } = useForm()
  const { itineraryDispatch } = useContext(ItineraryContext)
  const history = useHistory()
  const [mapMarkerState, setMapMarkerState] = useState<MapMarkerState>({
    origin: null,
    destination: null,
    editedTripLeg: null
  })

  const saveForm = (itineraryData: ItineraryData) => {
    // TODO add validation here!
    const newItinerary: Itinerary = createItinerary({
      tripLegs: [mapMarkerState.editedTripLeg],
      title: itineraryData.title,
      notes: itineraryData.notes
    })

    saveItinerary(newItinerary).then((itinerary: Itinerary) => {
      itineraryDispatch(storeItinerary(itinerary))
      itineraryDispatch(selectItinerary(itinerary))
      console.log('pushing to home');
      
      history.push('/home')
    })
  }

  const setMapContext = (place: Partial<MapMarkerState>) => {
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
          <MapMarkerContext.Provider value={{ ...mapMarkerState, setMapContext }}>
            <CreateTripLeg register={register} watch={watch} />
          </MapMarkerContext.Provider>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              inputRef={register}
              name="notes"
              label="Leave a description here..."
              type="text"
              id="notes"
              rows={5}
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