import { INote } from '../state/notesState'
import { BaseAction } from './generalActions';

export enum NotesActionTypes {
  SAVE_NOTES = 'SAVE_NOTES',
  SAVE_NOTE = 'SAVE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  SELECT_NOTE = 'SELECT_NOTE'
}

export interface SaveNotesAction extends BaseAction<NotesActionTypes.SAVE_NOTES> {
  payload: INote[]
}

export const saveNotes = (notes: INote[]): SaveNotesAction => {
  return {
    type: NotesActionTypes.SAVE_NOTES,
    payload: notes
  }
}

export interface SaveNoteAction extends BaseAction<NotesActionTypes.SAVE_NOTE> {
  payload: INote
}

export const saveNote = (note: INote): SaveNoteAction => {
  return {
    type: NotesActionTypes.SAVE_NOTE,
    payload: note
  }
}

export interface DeleteNoteAction extends BaseAction<NotesActionTypes.DELETE_NOTE> {
  payload: INote
}

export const deleteNote = (deletedNote: INote): DeleteNoteAction => {
  return {
    type: NotesActionTypes.DELETE_NOTE,
    payload: deletedNote
  }
}

export interface SelectNoteAction extends BaseAction<NotesActionTypes.SELECT_NOTE> {
  payload: INote | null
}

export const selectNote = (selectNote: INote | null): SelectNoteAction => {
  return {
    type: NotesActionTypes.SELECT_NOTE,
    payload: selectNote
  }
}

export type NotesActions = SaveNoteAction | SaveNotesAction | DeleteNoteAction | SelectNoteAction






