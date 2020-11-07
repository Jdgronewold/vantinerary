import React, { useContext } from 'react'
import { NoteContext } from '../../state'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { formatDate } from '../../utils/noteUtils';
import { flexStyles } from '../../utils/styleUtils';
import { selectNote, deleteNote as deleteNoteAction } from '../../actions/notesActions';
import { deleteNote } from '../../services/noteService'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  displayNoteRoot: {
    padding: theme.spacing(3),
    ...flexStyles({ flexDirection: 'column', alignItems: 'flex-start'})
  },
  displayNoteHeader: {
    ...flexStyles({ justifyContent: 'space-between' }),
    width: '100%'
  },
  displayNoteHeaderLeft: {
    ...flexStyles({ justifyContent: 'flex-start' }),
  },
  headerReturn: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  displayNoteBody: {
    padding: `${theme.spacing(2)}px 0`
  }
}))

export const DisplayNote: React.FC<{}> = () => {
  const { currentNote, notesDispatch } = useContext(NoteContext)
  const classes = useStyles()
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleDelete = () => {
    deleteNote(currentNote._id).then(() => {
      notesDispatch(deleteNoteAction(currentNote))
    })
    setAnchorEl(null)
  };

  const handleClose = () => {
    setAnchorEl(null)
  }
  const returnToNotes = () => {
    notesDispatch(selectNote(null))
  }

  return (
    <div className={classes.displayNoteRoot}>
      <div className={classes.displayNoteHeader}>
        <div className={classes.displayNoteHeaderLeft}>
          <Typography component="h1" variant="h6">
            { currentNote.title || formatDate(currentNote.date) }
          </Typography>
          <IconButton
            aria-label="more"
            aria-controls="note-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon fontSize='small' />
          </IconButton>
          <Menu
            id="note-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            color="secondary"
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem key='delete' onClick={handleDelete}>
              Delete Note
            </MenuItem>
            </Menu>
        </div>
        
        <Typography
          component="h2"
          variant="subtitle2"
          className={classes.headerReturn}
          onClick={returnToNotes}
        >
          Return to all notes
        </Typography>
      </div>
      <div className={classes.displayNoteBody}>
        { currentNote.body }
      </div>
    </div>
  )
}