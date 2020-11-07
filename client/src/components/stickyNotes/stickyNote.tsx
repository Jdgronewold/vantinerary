import React from 'react'
import { INote } from '../../state/notesState'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { formatDate } from '../../utils/noteUtils';

const useStyles = makeStyles((theme) => ({
  stickyRoot: {
    width: 175,
    height: 150,
    color: theme.palette.secondary.contrastText,
    margin: theme.spacing(2),
    ...flexStyles({ flexDirection: 'column'}),
    boxShadow: theme.shadows[6],
    '&:hover': {
      cursor: 'pointer'
    }
  },
  stickyHeader: {
    height: '30px',
    lineHeight: '30px',
    padding: '0px 5px',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.dark}`,
    ...flexStyles({ justifyContent: 'space-between'}),
  },
  stickyHeaderTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    height: 30
  },
  stickyHeaderDate: {
    fontSize: 10
  },
  stickyBody: {
    backgroundColor: theme.palette.secondary.light,
    flex: 1,
    width: '100%',
    padding: theme.spacing(1),
    height: 120,
    overflow: 'scroll'
  }
}))

export interface StickyNoteProps extends INote {
  clickAction?: () => void
}

export const StickyNote: React.FC<StickyNoteProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.stickyRoot} onClick={props.clickAction}>
      <div className={classes.stickyHeader}>
        <span className={classes.stickyHeaderTitle}> { props.title || formatDate(props.date) } </span>
        <span className={classes.stickyHeaderDate}>
          { props.title.length  && props.date ? formatDate(props.date) : '' }
        </span>
      </div>
      <div className={classes.stickyBody}>
        { props.children }
      </div>
    </div>
  )
}