import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'
import { Map } from '../map/map'
import { MapMarkerContext } from './createItinerary'

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
    paddingLeft: theme.spacing(1),
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

  const defaultDate = new Date()  

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
              <TextField
                variant="outlined"
                disabled
                name="origin"
                value={origin?.name}
                type="text"
                id="origin"
                placeholder='Search a location on the map'
                className={classes.locationField}
              />
            }
            label="Origin"
            labelPlacement='start'
            classes={{ root: classes.disabledClass }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                disabled
                name="destination"
                value={destination?.name}
                type="text"
                id="destination"
                placeholder='Search a location on the map'
                className={classes.locationField}
              />
            }
            label="Destination"
            labelPlacement='start'
            classes={{ root: classes.disabledClass  }}
          />
        </Grid>
      </Grid>
      <Grid container item xs={8}>
        <Grid item xs={12} className={classes.mapRoot}>
          <Map tripLegs={[]} shouldAllowSearch shouldShowPlanner={false} />
        </Grid>
      </Grid>
    </Grid>
  )
}