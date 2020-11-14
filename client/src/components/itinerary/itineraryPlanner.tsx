import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  itinPlannerRoot: {
    width: '25%',
    height: '100%',
    border: `1px solid ${theme.palette.divider}`
  }
}))

export const ItineraryPlanner = () => {
  const classes = useStyles()
  const history = useHistory()

  const onNewClick = () => {
    history.push('/home/createItinerary')
  }

  return (
    <div className={classes.itinPlannerRoot}>
      <List component="nav" aria-label="main">
        <ListItem button divider onClick={onNewClick}>
          <ListItemIcon>
            <AddCircleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="New Itinerary" />
        </ListItem>
        <ListItem button divider>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Itinerary" />
        </ListItem>
      </List>
    </div>
  )
}