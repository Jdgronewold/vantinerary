import React from 'react'
import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { ItineraryPlanner } from '../itinerary/itineraryPlanner'

const useStyles = makeStyles((theme) => ({
  mapRoot: {
    height: `calc(50% - ${theme.spacing(1)}px)`,
    width: '100%',
    ...flexStyles({ justifyContent: 'flex-end'}),
    paddingTop: theme.spacing(2)
  },
  mapContainer: {
    height: '100%',
    width: '50%',
    ...flexStyles({})
  }
}))

const routeRequest: google.maps.DirectionsRequest = {
  destination: { lat: 39.7392, lng: -104.9903 },
  origin: { lat: 40.0150, lng: -105.2705},
} 

let directionsService: google.maps.DirectionsService = null
let directionsRenderer: google.maps.DirectionsRenderer = null



export const Map: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.mapRoot}>
      <div className={classes.mapContainer}>
      <GoogleMapReact
          defaultZoom={10}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={{ lat: 40.0150, lng: -105.2705}}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={(gmaps) => {
            console.log(gmaps);
            const mapsTravleMode = gmaps.maps.TravelMode
            routeRequest.travelMode = mapsTravleMode.DRIVING
    
            directionsService = new gmaps.maps.DirectionsService()
            directionsRenderer = new gmaps.maps.DirectionsRenderer()
            
            directionsService.route(routeRequest,
              (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
                console.log(result);
                
                directionsRenderer.setDirections(result)
                directionsRenderer.setMap(gmaps.map)
            })
    
            }
          }
        >
          
        </GoogleMapReact>
      </div>
      <ItineraryPlanner />
    </div>
  )
}