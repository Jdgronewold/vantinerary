import React, { useRef, useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { ItineraryPlanner } from '../itinerary/itineraryPlanner'
import FilledInput from '@material-ui/core/FilledInput'
import { TripLeg } from '../../state'
import { Marker } from './marker'

const useStyles = makeStyles((theme) => ({
  mapRoot: {
    height: `100%`,
    width: '100%',
    ...flexStyles({}),
    position: 'relative'
  },
  searchBox: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: '40%',
    height: 40,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'darkGrey'
    }
  },
  searchBoxRoot: {
    padding: 5
  }
}))

interface MapProps {
  tripLegs: TripLeg[]
  shouldAllowSearch?: boolean
  shouldShowPlanner?: boolean
  onDirectionsResult?: (result: google.maps.DirectionsResult) => void
}



export const Map: React.FC<MapProps> = ({ tripLegs, shouldAllowSearch = false, shouldShowPlanner = false, onDirectionsResult  }) => {
  const [mapIsLoaded, setMapLoaded] = useState(false)
  const [currentMarker, setCurrentMarker] = useState<google.maps.places.PlaceResult>(null)
  const searchBoxRef = useRef()
  const directionsService = useRef<google.maps.DirectionsService>(null)
  const directionsRenderer = useRef<google.maps.DirectionsRenderer>(null)
  const searchBox = useRef<google.maps.places.SearchBox>(null)
  const map = useRef<google.maps.Map>(null)
  const mapsApi = useRef<any>(null)
  const geometry = useRef<any>(null)  

  const classes = useStyles()

  const onPlacesChanged = () => {
    const selected = searchBox.current.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.current.fitBounds(place.geometry.viewport);
    } else {
      map.current.setCenter(place.geometry.location);
      map.current.setZoom(17);
    }

    setCurrentMarker(place)
  }

  useEffect(() => {
    if (mapIsLoaded) {
      console.log('loaded', tripLegs);
      
      tripLegs.forEach(({ overviewPolyline, destination, origin }: TripLeg) => {
        console.log(overviewPolyline);
        console.log(map.current)
        const tripLegRendered = !!directionsRenderer.current.getDirections()?.routes.find((r: google.maps.DirectionsRoute) => r.overview_polyline === overviewPolyline)

        if (!tripLegRendered) {
          console.log('blah');
          
          if (overviewPolyline?.length) {
            const paths: google.maps.LatLng[] = geometry.current.encoding.decodePath(overviewPolyline)
            console.log(paths);
            console.log(paths.slice(0, paths.length - 1));
            
            
            const polygon: google.maps.Polygon = new mapsApi.current.Polyline({
              path: paths.slice(0, paths.length - 1),
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2
            })
  
            polygon.setMap(map.current)
  
          } else {
            const request: google.maps.DirectionsRequest = {
              destination: destination,
              origin: origin,
              travelMode: google.maps.TravelMode.DRIVING
            }
  
            directionsService.current.route(request,
              (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
                console.log(result);
                
                directionsRenderer.current.setDirections(result)
                directionsRenderer.current.setMap(map.current)
                if (onDirectionsResult) {
                  onDirectionsResult(result)
                }
            })
          }
        }
      })
    }
  }, [mapIsLoaded, tripLegs])

  return (
    <div className={classes.mapRoot}>
      <GoogleMapReact
          defaultZoom={10}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
            libraries: ['places', 'geometry']
          }}
          defaultCenter={{ lat: 40.0150, lng: -105.2705}}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={(gmaps) => {
            mapsApi.current = gmaps.maps
            map.current = gmaps.map

            directionsService.current = new mapsApi.current.DirectionsService()
            console.log(directionsService);
            
            directionsRenderer.current = new mapsApi.current.DirectionsRenderer()            
            geometry.current = mapsApi.current.geometry

            if (shouldAllowSearch) {
              searchBox.current = new mapsApi.current.places.SearchBox(searchBoxRef.current)
              searchBox.current.addListener('places_changed', onPlacesChanged);
            }
            

            setMapLoaded(true)   
            }
          }
        >
          {
            currentMarker &&
            <Marker
              lat={currentMarker.geometry.location.lat()}
              lng={currentMarker.geometry.location.lng()}
              place={currentMarker}
            />
          }
        </GoogleMapReact>
        { 
          shouldAllowSearch &&
          <FilledInput
            inputRef={searchBoxRef}
            name="searchBox"
            type="text"
            id="searchBox"
            classes={{
              input: classes.searchBoxRoot
            }}
            className={classes.searchBox}
          />
        }
      { shouldShowPlanner && <ItineraryPlanner /> }
    </div>
  )
}