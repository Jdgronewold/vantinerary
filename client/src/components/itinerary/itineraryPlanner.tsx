import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom'
import { Itinerary, ItineraryContext } from '../../state'
import { selectItinerary, deleteItinerary as removeItinerary } from '../../actions'
import { deleteItinerary } from '../../services/itineraryService'

const useStyles = makeStyles((theme) => ({
  itinPlannerRoot: {
    width: '25%',
    height: '100%',
    border: `1px solid ${theme.palette.divider}`
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export const ItineraryPlanner = () => {
  const classes = useStyles()
  const history = useHistory()
  const { itineraries, itineraryDispatch, currentItinerary } = useContext(ItineraryContext)

  const onNewClick = () => {
    history.push('/home/createItinerary')
  }

  const onDelete = (itineraryId: string) => {
    deleteItinerary(itineraryId).then((itinerary: Itinerary) => {
      itineraryDispatch(removeItinerary(itinerary._id))
    })
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
            <div  key={itinerary._id}>
              <ListItem button divider onClick={() => itineraryDispatch(selectItinerary(itinerary))}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={itinerary.title} />
              </ListItem>
              <Collapse in={currentItinerary?._id === itinerary?._id}>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='Edit' />
                  </ListItem>
                  <ListItem button className={classes.nested} onClick={() => onDelete(itinerary._id)}>
                    <ListItemText primary='Delete' />
                  </ListItem>
                </List>
              </Collapse>
            </div>
          ))
        }
      </List>
    </div>
  )
}