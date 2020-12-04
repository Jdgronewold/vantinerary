import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom'
import { ItineraryContext } from '../../state'
import { selectItinerary } from '../../actions'

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
  const { itineraries, itineraryDispatch } = useContext(ItineraryContext)

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
        {
          itineraries.map((itinerary) => (
            <ListItem button divider onClick={() => itineraryDispatch(selectItinerary(itinerary))} key={itinerary._id}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary={itinerary.title} />
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}