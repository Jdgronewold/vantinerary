import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  createTripLegRoot: {
    ...flexStyles({})
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
}))

interface CreateTripLegProps {
  register: () => void
}

export const CreateTripLeg: React.FC<CreateTripLegProps> = ({ register }: CreateTripLegProps) => {
  const classes = useStyles()

  const defaultDate = new Date()  

  return (
    <Grid container className={classes.dateForm}>
      <Grid item xs={4}>
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
      <Grid item xs={4}>
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
    </Grid>
  )
}