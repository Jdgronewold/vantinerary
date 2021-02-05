import React, { useContext, useMemo } from 'react'
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
    deleteItinerary(itineraryId).then((response: { id: number }) => {
      itineraryDispatch(removeItinerary(response.id.toString()))
    })
  }

  const onSelect = (itinerary: Itinerary) => () => {
    if (itinerary === currentItinerary) {
      itineraryDispatch(selectItinerary(null))
    } else {
      itineraryDispatch(selectItinerary(itinerary))
    }
  }

  const onEdit = () => {
    history.push('/home/editItinerary')
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
            <div  key={itinerary.id}>
              <ListItem button divider onClick={onSelect(itinerary)}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={itinerary.title} />
              </ListItem>
              <Collapse in={currentItinerary?.id === itinerary?.id}>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} onClick={onEdit}>
                    <ListItemText primary='Edit' />
                  </ListItem>
                  <ListItem button className={classes.nested} onClick={() => onDelete(itinerary.id)}>
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