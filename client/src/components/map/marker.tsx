import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import { MapMarkerContext, MapContextType } from '../itinerary/createItinerary'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { convertPlaceToLocation } from '../../utils/directionsUtils';

const useStyles = makeStyles((theme) => ({
  markerRoot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    userSelect: 'none',
    transform: 'translate(-50%, -120%)',
    '&:hover': {
      cursor: 'pointer',
      zIndex: 1,
    },
  },
  markerPrimary: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  },
}))

interface MarkerProps {
  lat: number
  lng: number 
  place: google.maps.places.PlaceResult
}

export const Marker = ({ place }: MarkerProps) => {
  const options: ('origin' | 'destination')[] = ['origin', 'destination']
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { origin, destination, setMapContext } = useContext(MapMarkerContext)

  // TODO: Turn into generic component
  const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavClose = (event: React.MouseEvent) => {
    setAnchorEl(null);
  };

  const handleMenuSelection = (index: number) => {
    const optionIsOrigin = options[index] === 'origin'
    const initialState: Partial<MapContextType> =  {
      [options[index]]: place
    }

    const routeSelectionCompleted = origin && !destination
    const routeOriginSelectionChanged = origin && origin?.name !== place.name &&  optionIsOrigin
    const routeDestinationChanged = destination && destination?.name !== place.name && !optionIsOrigin
    if (routeSelectionCompleted || routeOriginSelectionChanged || routeDestinationChanged) {
      if (optionIsOrigin) {
        initialState.editedTripLeg = {
          origin: convertPlaceToLocation(place),
          destination: convertPlaceToLocation(destination)
        }
      } else {
        initialState.editedTripLeg = {
          origin: convertPlaceToLocation(origin),
          destination: convertPlaceToLocation(place)
        }
      }
    }
    setMapContext(initialState)
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="main-view-menu"
        size="small"
        onClick={handleNavClick}
        className={classes.markerRoot}
      >
        <AirportShuttleIcon />
      </IconButton>
      <Menu
        id="main-view-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleNavClose}
        getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
      {
        options.map((option, index) => {
        return (
          <MenuItem
            onClick={() => handleMenuSelection(index)}
            key={option}
          >
            <Typography variant="body1" color="inherit"> { ` Set as ${option}` } </Typography>
          </MenuItem>
        )
      })
      }              
    </Menu>
    </>
  )
}