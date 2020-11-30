import React, { useRef, useState, useEffect, useMemo } from 'react'
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
}



export const Map: React.FC<MapProps> = ({ tripLegs, shouldAllowSearch = false, shouldShowPlanner = false  }) => {
  const [mapIsLoaded, setMapLoaded] = useState(false)
  const [currentMarker, setCurrentMarker] = useState<google.maps.places.PlaceResult>(null)
  const searchBoxRef = useRef()
  let directionsService: google.maps.DirectionsService = null
  let directionsRenderer: google.maps.DirectionsRenderer = null
  let searchBox: google.maps.places.SearchBox
  let map: google.maps.Map = null
  let mapsApi: any
  let geometry: any

  const classes = useStyles()

  const onPlacesChanged = () => {
    const selected = searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    setCurrentMarker(place)
  }

  useEffect(() => {
    if (mapIsLoaded) {
      tripLegs.forEach(({ overviewPolyline, destination, origin }: TripLeg) => {

        if (overviewPolyline.length) {
          const polygon: google.maps.Polygon = new mapsApi.Polygon({
            paths: geometry?.encoding.decodePath(overviewPolyline),
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          })

          polygon.setMap(map)

        } else {
          const request: google.maps.DirectionsRequest = {
            destination: destination,
            origin: origin,
            travelMode: google.maps.TravelMode.DRIVING
          }

          directionsService.route(request,
            (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
              console.log(result);
              
              directionsRenderer.setDirections(result)
              directionsRenderer.setMap(map)
          })
        }
      })
    }
  }, [mapIsLoaded])

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
            console.log(gmaps);
            mapsApi = gmaps.maps
            map = gmaps.map

            directionsService = new mapsApi.DirectionsService()
            directionsRenderer = new mapsApi.DirectionsRenderer()            
            geometry = mapsApi.geometry

            if (shouldAllowSearch) {
              searchBox = new mapsApi.places.SearchBox(searchBoxRef.current)
              searchBox.addListener('places_changed', onPlacesChanged);
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