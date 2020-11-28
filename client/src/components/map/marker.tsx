import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import Avatar from '@material-ui/core/Avatar';


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
  onClick: () => void
}

export const Marker = ({ onClick}: MarkerProps) => {
  const classes = useStyles()

  return (
    <Avatar
      className={classes.markerRoot}
      variant='rounded'
      classes={{
        colorDefault: classes.markerPrimary
      }}
    >
      <AirportShuttleIcon />
    </Avatar>
  )
}