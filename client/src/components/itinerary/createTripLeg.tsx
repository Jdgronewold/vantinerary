import React, { useContext, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'
import { Map } from '../map/map'
import { MapMarkerContext } from './createItinerary'
import { TripLeg } from '../../state'
import { convertDirectionResult, convertPlaceToLocation } from '../../utils/directionsUtils'

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
  }
}))

interface CreateTripLegProps {
  register: () => void,
  watch: (fieldName: string) => any
}

export const CreateTripLeg: React.FC<CreateTripLegProps> = ({ register, watch }: CreateTripLegProps) => {
  const classes = useStyles()
  const { origin, destination, editedTripLeg, setMapContext } = useContext(MapMarkerContext)
  const startDate = watch('startDate') as Date
  const endDate = watch('endDate') as Date

  const defaultDate = new Date()  

  const onDirectionsResult = (result: google.maps.DirectionsResult) => {
    const newTripLeg = convertDirectionResult(
      result,
      {
        origin: convertPlaceToLocation(origin),
        destination: convertPlaceToLocation(destination),
        arrivalDate: endDate,
        departureDate: startDate
      }
    )
    setMapContext({ editedTripLeg: newTripLeg })
  }

  const drawnTripLegs = useMemo(() => origin && destination ? [editedTripLeg] : [], [origin, destination])

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
        <Grid item>
          <FormControlLabel
            control={
              <div className={classes.locationField}>
                { editedTripLeg?.time || 'Create a route'}
              </div>
            }
            label="Travel Time"
            labelPlacement='start'
            classes={{ root: classes.disabledClass  }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <div className={classes.locationField}>
                { editedTripLeg?.distance || 'Create a route'}
              </div>
            }
            label="Distance"
            labelPlacement='start'
            classes={{ root: classes.disabledClass  }}
          />
        </Grid>
      </Grid>
      <Grid container item xs={8} direction='row'>
        <Grid item xs={12} className={classes.mapRoot}>
          <Map
            tripLegs={drawnTripLegs}
            shouldAllowSearch
            shouldShowPlanner={false}
            onDirectionsResult={onDirectionsResult}
          />
        </Grid>
        <Grid item>
            Create a route by searching locations on the map and adding them as an origin or destination.
        </Grid>
      </Grid>
    </Grid>
  )
}