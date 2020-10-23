import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles, backgroundImage } from '../../utils/styleUtils'
import vanJPG from '../../static/van.jpg'
import { UserContext } from '../../state/userState'
import { isUserLoggedIn } from '../../utils/userUtils';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  splash: {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    
    ...flexStyles({ flexDirection: 'column', justifyContent: 'start' }),
    position: 'relative',
    ...backgroundImage(vanJPG)
  },
  title: {
    position: 'absolute',
    top: '25%',
    fontSize: theme.typography.h2.fontSize
  },
  subtitle: {
    position: 'absolute',
    top: '35%',
    fontSize: theme.typography.h4.fontSize
  }
}));

export const Splash = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext)

  return isUserLoggedIn(user) ?  <Redirect to='/home' /> : (
    <div className={classes.splash}>
      <h2 className={classes.title}> Vantinerary </h2>
      <h4 className={classes.subtitle}> Plan trips, keep notes, and connect with your van community! </h4>
    </div>
  )
}