import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { Sidebar } from '../sidebar/sidebar'
import { VanCalendar } from '../calendar/calendar'


const useStyles = makeStyles((theme) => ({
    homepage: {
      width: '100vw',
      height: 'calc(100vh - 64px)', // also set in the splash page
      ...flexStyles({ alignItems: 'flex-start'})
    },
    mainContent: {
      flex: 1
    }
  })
) 

export const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.homepage}>
      <Sidebar />
      <div className={classes.mainContent}>
        <VanCalendar />
      </div>
    </div>
  )
}