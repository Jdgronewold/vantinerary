import React, { useContext } from 'react'
import { INote, NoteContext } from '../../state/notesState'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { StickyNote } from './stickyNote';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useHistory } from 'react-router-dom';
import { selectNote } from '../../actions/notesActions';

const useStyles = makeStyles((theme) => ({
  stickyNotesRoot: {
    paddingTop: theme.spacing(3),
    height: '50%',
    width: '100%',
    ...flexStyles({ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }),
    flexWrap: 'wrap'
  },
  newNote: {
    height: '100%',
    ...flexStyles({ flexDirection: 'column', justifyContent: 'center'}),
    fontSize: '18px',
    '& span': {
      padding: theme.spacing(1)
    },
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const newNote: INote = {
  title: 'New Note',
  body: ''
}

export const StickyNotes = () => {
  const classes = useStyles()
  const { notes, notesDispatch } = useContext(NoteContext)
  const history = useHistory();

  const createNewNote = () => {
    history.push('/home/createNote')
  }

  return (
    <div className={classes.stickyNotesRoot}>
      <StickyNote {...newNote} clickAction={createNewNote}>
        <div className={classes.newNote}>
          <span> Add Note </span>
          <AddCircleOutlineOutlinedIcon color="secondary" />  
        </div>
      </StickyNote>
      {
        notes.map((note: INote, index) => (
          <StickyNote {...note} key={index} clickAction={() => notesDispatch(selectNote(note))}>
            { note.body }
          </StickyNote>
        ))
      }
    </div>
  )
}