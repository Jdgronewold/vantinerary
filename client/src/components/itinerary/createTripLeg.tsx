import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'
import { Map } from '../map/map'
import { MapMarkerContext } from './createItinerary'
import { TripLeg } from '../../state'

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
    padding: `18.5px 14px`,
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
    ...flexStyles({})
  }
}))

interface CreateTripLegProps {
  register: () => void
}

export const CreateTripLeg: React.FC<CreateTripLegProps> = ({ register }: CreateTripLegProps) => {
  const classes = useStyles()
  const { origin, destination } = useContext(MapMarkerContext)
  const [editedTripLeg, setEditedTripLeg] = useState<TripLeg>({
    origin: origin ? { lat: origin.geometry.location.lat(), lng: origin.geometry.location.lng(), name: origin.name } : null,
    destination: destination ? { lat: destination.geometry.location.lat(), lng: destination.geometry.location.lng(), name: destination.name } : null,
  })

  const defaultDate = new Date()  

  const onDirectionsResult = (result: google.maps.DirectionsResult) => {
    
  }

  const drawnTripLegs = origin && destination ? [editedTripLeg] : []

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
      </Grid>
      <Grid container item xs={8}>
        <Grid item xs={12} className={classes.mapRoot}>
          <Map
            tripLegs={drawnTripLegs}
            shouldAllowSearch
            shouldShowPlanner={false}
            onDirectionsResult={onDirectionsResult}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}