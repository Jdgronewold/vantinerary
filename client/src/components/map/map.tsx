import React, { useRef, useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@material-ui/core/styles'
import { flexStyles } from '../../utils/styleUtils'
import { ItineraryPlanner } from '../itinerary/itineraryPlanner'
import FilledInput from '@material-ui/core/FilledInput'
import { Itinerary, TripLeg } from '../../state'
import { Marker } from './marker'
import { mapColorArray } from '../../utils/directionsUtils'

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
  itinerary: Itinerary
  shouldAllowSearch?: boolean
  shouldShowPlanner?: boolean
  updateContext?: (map: google.maps.Map, mapApi: any) => void
}



export const Map: React.FC<MapProps> = ({ itinerary, shouldAllowSearch = false, shouldShowPlanner = false, updateContext }) => {
  const [mapIsLoaded, setMapLoaded] = useState(false)
  const [currentMarker, setCurrentMarker] = useState<google.maps.places.PlaceResult>(null)
  const searchBoxRef = useRef()
  const directionsRenderer = useRef<google.maps.DirectionsRenderer>(null)
  const drawnPolylines = useRef<{ [polyline: string]: google.maps.Polyline}>({})
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
    
    if (mapIsLoaded && itinerary) {
      const { tripLegs } = itinerary
      console.log(itinerary);

      Object.keys(drawnPolylines.current).forEach((overviewPolyline: string) => {
        if (!tripLegs.some((tripLeg) => tripLeg.overviewPolyline === overviewPolyline)) {
          drawnPolylines.current[overviewPolyline].setMap(null)
          delete drawnPolylines.current[overviewPolyline]
        }
      })
      
      tripLegs.forEach(({ overviewPolyline }: TripLeg, index: number) => {
        const tripLegRendered = !!drawnPolylines.current[overviewPolyline]
        
        if (!tripLegRendered) {
          
          if (overviewPolyline?.length) {
            const paths: google.maps.LatLng[] = geometry.current.encoding.decodePath(overviewPolyline)
            
            const polyline: google.maps.Polyline = new mapsApi.current.Polyline({
              path: paths.slice(0, paths.length - 1),
              geodesic: true,
              strokeColor: mapColorArray[index % mapColorArray.length],
              strokeOpacity: 0.8,
              strokeWeight: 2
            })

            polyline.setMap(map.current)
            drawnPolylines.current[overviewPolyline] = polyline
  
          }
        }
      })
    }
  }, [mapIsLoaded, itinerary])
  
  useEffect(() => {
    if (mapIsLoaded && itinerary) {
      const bounds: google.maps.LatLngBounds = new mapsApi.current.LatLngBounds()

      const { tripLegs } = itinerary
      if (tripLegs && tripLegs.length) {
        tripLegs.forEach((tripLeg: TripLeg) => {
          bounds.extend(tripLeg.origin)
          bounds.extend(tripLeg.destination)
        })

        map.current.fitBounds(bounds)
      }
    }

  }, [mapIsLoaded, itinerary])

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
            
            directionsRenderer.current = new mapsApi.current.DirectionsRenderer()            
            geometry.current = mapsApi.current.geometry

            if (shouldAllowSearch) {
              searchBox.current = new mapsApi.current.places.SearchBox(searchBoxRef.current)
              searchBox.current.addListener('places_changed', onPlacesChanged);
            }
            
            setMapLoaded(true)
            
            if (updateContext) {
              updateContext(gmaps.map, gmaps.maps)
            }
          }}
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