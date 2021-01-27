import React, { useContext } from 'react'
import { ItineraryContext, TripLeg } from '../../state'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { flexStyles } from '../../utils/styleUtils'
import { parseGoogleTimes } from '../../utils/directionsUtils'


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

  const totalMileage = currentItinerary.tripLegs.reduce((accum: number, tripLeg: TripLeg) => {
    const mileage = parseInt(tripLeg.distance.replace(/\D/g,''))
    return accum + mileage
  }, 0)

  const { days, hours, minutes } = currentItinerary.tripLegs.reduce((accum, tripLeg: TripLeg) => {
    const addOnTime = parseGoogleTimes(tripLeg.time)

    const totalMinutes = (accum.minutes + addOnTime.minutes)
    const totalHours = (accum.hours + addOnTime.hours)
    const totalDays = (accum.days + addOnTime.days)
    
    const finalMinutes = totalMinutes % 60
    const finalHours = (totalHours + Math.floor(totalMinutes/60)) % 24
    const finalDays = totalDays + Math.floor((totalHours + + Math.floor(totalMinutes/60))/24) 
    
    
    return {
      days: finalDays,
      hours: finalHours,
      minutes: finalMinutes,
    }
  }, { days: 0, hours: 0, minutes: 0})
  
  const totalTimeString =
    (days > 0 ? days > 1 ? `${days} days ` : '1 day ' : '') +
    (hours > 0 ? hours > 1 ? `${hours} hours ` : '1 hour' : '') + 
    (minutes > 0 ? minutes > 1 ? `${minutes} minutes` : '1 minutes' : '') 

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component="h2" variant="h5" >
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
      <br/>
      <Grid item xs={10}>
        <Typography component="h2" variant="h6">
            Details
        </Typography>
      </Grid>
      <Grid item xs={12} container direction='column'>
        <Grid>
          <span> Total Mileage: { totalMileage } miles </span>
        </Grid>
        <Grid>
          <span> Total Time: { totalTimeString } </span>
        </Grid>
      </Grid>
      <br/>
      <Grid item xs={10}>
        <Typography component="h2" variant="h6">
            Notes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        { currentItinerary.notes}
      </Grid>
    </Grid>
  )
}