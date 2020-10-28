import React, { useContext } from 'react'
import { INote, NoteContext } from '../../state/notesState'
import { makeStyles } from '@material-ui/core/styles';
import { flexStyles } from '../../utils/styleUtils';
import { StickyNote } from './stickyNote';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  stickyNotesRoot: {
    height: '50%',
    width: '100%',
    ...flexStyles({ flexDirection: 'column', alignItems: 'space-between' }),
    flexWrap: 'wrap'
  }
}))

const newNote: INote = {
  title: 'New Note',
  body: ''
}

export const StickyNotes = () => {
  const classes = useStyles()
  const { notes } = useContext(NoteContext)

  return (
    <div className={classes.stickyNotesRoot}>
      <StickyNote {...newNote}>
        <AddCircleOutlineOutlinedIcon color="secondary" />  
      </StickyNote>
      {
        notes.map((note: INote) => (
          <StickyNote {...note}>
            { note.body }
          </StickyNote>
        ))
      }
    </div>
  )
}