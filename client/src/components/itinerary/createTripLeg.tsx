import React, { useContext, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'
import { Map } from '../map/map'
import { MapMarkerContext } from './createItinerary'
import Button from '@material-ui/core/Button'
import { TripLeg } from '../../state'
import { convertDirectionResult, convertPlaceToLocation, createItinerary } from '../../utils/directionsUtils'

const useStyles = makeStyles((theme) => ({
  dateForm: {
    paddingLeft: 8
  },
  dateFieldContainer: {
    margin: 0,
    justifyContent: 'space-between',
    width: '80%',
    paddingTop: theme.spacing(2)
  },
  dateField: {
    paddingLeft: theme.spacing(1),
  },
  locationField: {
    width: 193,
    padding: `18.5px 12px`,
    borderRadius: 4,
    border: '1px solid rgba(0, 0, 0, 0.87)',
    cursor: 'default'
  },
  disabledClass: {
    margin: 0,
    justifyContent: 'space-between',
    width: '80%',
    paddingTop: theme.spacing(2),
    color: 'black',
  },
  mapRoot: {
    height: 400,
    width: 400,
    ...flexStyles({}),
    paddingTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '80%'
  },
}))

interface CreateTripLegProps {
  register: () => void,
  watch: (fieldName: string) => any
}

export const CreateTripLeg: React.FC<CreateTripLegProps> = ({ register, watch }: CreateTripLegProps) => {
  const classes = useStyles()
  const { origin, destination, tripLegs, map, mapApi, setMapContext } = useContext(MapMarkerContext)
  const startDate = watch('startDate') as Date
  const endDate = watch('endDate') as Date

  const defaultDate = new Date()  

  const partialItinerary = useMemo(() => createItinerary({
    tripLegs
  }), [tripLegs])

  const updateContext = useMemo(() => (map: google.maps.Map, mapApi: any) => {
    setMapContext({ map, mapApi })
  }, [])

  const saveTripLeg = useMemo(() => (event: React.MouseEvent) => {
    event.preventDefault()
    if (!map && !mapApi) {
      alert('Map has not loaded!')
    } else {
      const request: google.maps.DirectionsRequest = {
        destination: convertPlaceToLocation(destination),
        origin: convertPlaceToLocation(origin),
        travelMode: google.maps.TravelMode.DRIVING
      }
      const directionsService: google.maps.DirectionsService = new mapApi.DirectionsService()
      directionsService.route(request,
        (result: google.maps.DirectionsResult) => {
          console.log(result);
                
          const newTripLeg = convertDirectionResult(
            result,
            {
              origin: convertPlaceToLocation(origin),
              destination: convertPlaceToLocation(destination),
              arrivalDate: endDate,
              departureDate: startDate
            }
          )
          const newTripLegs = tripLegs.slice()
          newTripLegs.push(newTripLeg)
          setMapContext({ tripLegs: newTripLegs, origin: null, destination: null })
      })
    }
  }, [origin, destination, tripLegs, map, mapApi])

  return (
    <Grid container>
      <Grid container direction='column' item className={classes.dateForm} xs={4}>
        <Grid item>
          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                inputRef={register}
                name="startDate"
                defaultValue={moment(defaultDate).format('YYYY-MM-DD')}
                type="date"
                id="startDate"
                className={classes.dateField}
              />
            }
            label="Start Date"
            labelPlacement='start'
            classes={{ root: classes.dateFieldContainer }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                inputRef={register}
                name="endDate"
                defaultValue={moment(defaultDate).format('YYYY-MM-DD')}
                type="date"
                id="endDate"
                className={classes.dateField}
              />
            }
            label="End Date"
            labelPlacement='start'
            classes={{ root: classes.dateFieldContainer }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <div className={classes.locationField}>
                { origin?.name || 'Search a location'}
              </div>
            }
            label="Origin"
            labelPlacement='start'
            classes={{ root: classes.disabledClass }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <div className={classes.locationField}>
                { destination?.name || 'Search a location'}
              </div>
            }
            label="Destination"
            labelPlacement='start'
            classes={{ root: classes.disabledClass  }}
          />
        </Grid>
        <Grid item container justify='center'>
          
        </Grid>
        <Grid item container justify='center'>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={saveTripLeg}
            disabled={!origin || !destination}
          >
            Save Trip Leg
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={8} direction='row'>
        <Grid item xs={12} className={classes.mapRoot}>
          <Map
            itinerary={partialItinerary}
            shouldAllowSearch
            shouldShowPlanner={false}
            updateContext={updateContext}
          />
        </Grid>
        <Grid item>
            Create a trip leg by searching locations on the map and adding them as an origin or destination.
        </Grid>
      </Grid>
    </Grid>
  )
}