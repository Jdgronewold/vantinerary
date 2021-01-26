import React, { useContext } from 'react'
import { ItineraryContext, TripLeg } from '../../state'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { flexStyles } from '../../utils/styleUtils'


const useStyles = makeStyles((theme) => ({
  tripLegsText: {
    ...flexStyles({ justifyContent: 'flex-start', flexDirection: 'column'})
  },
  tripLegsContainer: {
    ...flexStyles({ justifyContent: 'space-around'}),
    border: `1px solid ${theme.palette.primary.main}`
  }
}))

export const DisplayItinerary: React.FC = () => {
  const classes = useStyles()
  const { currentItinerary } = useContext(ItineraryContext)

  if (!currentItinerary) {
    return null
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component="h2" variant="h4" >
          { currentItinerary.title }
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography component="h2" variant="h6">
            Trip Legs
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        {
            currentItinerary.tripLegs.map((tripLeg: TripLeg, index) => {
            return (
              <Grid item xs={4} key={tripLeg.overviewPolyline + index}>
                <div className={classes.tripLegsContainer}>
                  <div className={classes.tripLegsText}>
                    <span style={{fontWeight: 'bold'}}> {`${tripLeg.origin.name} to ${tripLeg.destination.name}`} </span>
                    <span> {`${tripLeg.distance} and ${tripLeg.time}`} </span>
                  </div>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </Grid>
  )
}