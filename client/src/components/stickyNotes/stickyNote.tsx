import React from 'react'
import { INote } from '../../state/notesState'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';

const useStyles = makeStyles((theme) => ({
  stickyRoot: {
    width: '200px',
    height: '200px',
    color: theme.palette.secondary.contrastText,
    ...flexStyles({ flexDirection: 'column'})
  },
  stickyHeader: {
    height: '30px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid ${theme.palette.secondary.main}`
  },
  stickyBody: {
    backgroundColor: theme.palette.secondary.light,
    flex: 1,
    width: '100%',
  }
}))

export interface StickyNoteProps extends INote {
  clickAction?: () => void
}

export const StickyNote: React.FC<StickyNoteProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.stickyRoot}>
      <div className={classes.stickyHeader}>
        { props.title || props.date.toDateString() }
      </div>
      <div className={classes.stickyBody}>
        { props.children }
      </div>
    </div>
  )
}