import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { useForm } from "react-hook-form"
import { Itinerary, ItineraryContext, TripLeg } from '../../state'
import { saveItinerary as storeItinerary, selectItinerary, editItinerary as storeEditedItinerary} from '../../actions'
import { saveItinerary, editItinerary } from '../../services/itineraryService'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { CreateTripLeg } from './createTripLeg'
import { useHistory } from 'react-router-dom'
import { createItinerary } from '../../utils/directionsUtils'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';


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
  tripLegsText: {
    ...flexStyles({ justifyContent: 'flex-start', flexDirection: 'column'})
  },
  tripLegsContainer: {
    ...flexStyles({ justifyContent: 'space-around'}),
    border: `1px solid ${theme.palette.primary.main}`
  }
}))

interface MapMarkerState {
  origin: google.maps.places.PlaceResult
  destination: google.maps.places.PlaceResult
  tripLegs: TripLeg[]
  map?: google.maps.Map,
  mapApi?: any // lame google doesnt seem to have a typing for this
}

export interface MapContextType extends MapMarkerState {
  setMapContext: (place: Partial<MapMarkerState>) => void
}

export const MapMarkerContext = React.createContext<MapContextType>({
  origin: null,
  destination: null,
  tripLegs: [],
  setMapContext: () => {},
  map: null,
  mapApi: null
})

interface CreateAndEditItineraryProps {
  isEditing: boolean
}

interface ItineraryData {
  title: string,
  startDate: Date,
  endDate: Date,
  notes: string
}

export const CreateAndEditItinerary: React.FC<CreateAndEditItineraryProps> = ({ isEditing }) => {
  const classes = useStyles()
  const { register, handleSubmit, watch } = useForm()
  const { itineraryDispatch, currentItinerary } = useContext(ItineraryContext)
  const history = useHistory()

  const [mapMarkerState, setMapMarkerState] = useState<MapMarkerState>({
    origin: null,
    destination: null,
    tripLegs: (isEditing && currentItinerary) ? currentItinerary.tripLegs : [],
    map: null,
    mapApi: null
  })


  if (isEditing && !currentItinerary) {
    history.push('/home')
    return null
  }

  const saveForm = (itineraryData: ItineraryData) => {
    // TODO add validation here!
    if (isEditing) {
      const newItinerary: Itinerary = {
        ...currentItinerary,
        tripLegs: mapMarkerState.tripLegs,
        title: itineraryData.title,
        notes: itineraryData.notes
      }

      editItinerary(newItinerary).then((itinerary) => {
        itineraryDispatch(storeEditedItinerary(itinerary))
        itineraryDispatch(selectItinerary(itinerary))

        history.push('/home')
      })

    } else {
      const newItinerary: Itinerary = createItinerary({
        tripLegs: mapMarkerState.tripLegs,
        title: itineraryData.title,
        notes: itineraryData.notes
      })

      saveItinerary(newItinerary).then((itinerary: Itinerary) => {
        itineraryDispatch(storeItinerary(itinerary))
        itineraryDispatch(selectItinerary(itinerary))
      
        history.push('/home')
      })
    }
  }

  const setMapContext = (place: Partial<MapMarkerState>) => {
    setMapMarkerState({
      ...mapMarkerState,
      ...place
    })
  }

  const deleteTripLeg = (index: number) => () => {
    const newTripLegs = mapMarkerState.tripLegs.slice()
    newTripLegs.splice(index, 1)
    setMapMarkerState({ ...mapMarkerState, tripLegs: newTripLegs })
  }

  const cancelEdit = () => {
    history.push('/home')
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
              label="Title"
              inputRef={register}
              name="title"
              defaultValue={ isEditing ? currentItinerary.title : '' }
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
          <Grid item xs={10}>
            <Typography component="h2" variant="h6">
                Trip Legs
            </Typography>
          </Grid>
          <Grid item xs={10} container spacing={2}>
            {
              mapMarkerState.tripLegs.map((tripLeg: TripLeg, index) => {
                return (
                  <Grid item xs={4} key={tripLeg.overviewPolyline + index}>
                    <div className={classes.tripLegsContainer}>
                      <div className={classes.tripLegsText}>
                        <span style={{fontWeight: 'bold'}}> {`${tripLeg.origin.name} to ${tripLeg.destination.name}`} </span>
                        <span> {`${tripLeg.distance} and ${tripLeg.time}`} </span>
                      </div>
                      <IconButton
                        aria-label="Delete Trip Leg"
                        onClick={deleteTripLeg(index)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </div>
                  </Grid>
                )
              })
            }
          </Grid>
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
              defaultValue={ isEditing ? currentItinerary.notes : '' }
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
          { isEditing ? 'Edit Itinerary' :  'Create Itinerary' }
        </Button>
        {
          isEditing && 
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={cancelEdit}
          >
            Cancel Edit
          </Button>
        }
      </form>
    </div>
    
  )
}