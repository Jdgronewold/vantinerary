import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: (props) => ({
    flexBasis: props ? '150px' : '50px',
    height: '100%',
    borderRight: `2px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
  })
})
) 

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const classes = useStyles(sidebarOpen)

  return (
    <div className={classes.sidebar}>
      <ul>
        
      </ul>
    </div>
  )
}