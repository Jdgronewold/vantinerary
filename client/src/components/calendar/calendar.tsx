import React, { useContext, useMemo } from 'react'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import { useHistory } from "react-router-dom";
import moment from 'moment'
import { INote, NoteContext } from '../../state'
import { calendarEvent, eventStyleGetter } from './event'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { formatDate } from '../../utils/noteUtils'
import { selectNote } from '../../actions/notesActions'

const localizer = momentLocalizer(moment)

interface SlotInfo {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
}

export const VanCalendar = () => {
  const { notes, notesDispatch } = useContext(NoteContext)
  const history = useHistory()

  const transformNotes = (notes: INote[]): Event[] => {
    return notes.map((note: INote): Event => ({
      start: note.date,
      end: note.date,
      title: note.title || formatDate(note.date),
      allDay: true,
      resource: { note, selectNote: () => notesDispatch(selectNote(note)) }
    }))
  }
  const memoNotes = useMemo(() => transformNotes(notes), [notes])

  const onClickEvent = (event: Event) => {
    event.resource.selectNote()
  }

  const onClickDate = (slotInfo: SlotInfo) => {
    history.push('/home/createNote', { date: slotInfo.start} )
  }

  return (
    <Calendar
      events={memoNotes}
      step={60}
      showMultiDayTimes
      selectable
      onSelectSlot={onClickDate}
      defaultDate={new Date()}
      localizer={localizer}
      defaultView="month"
      style={{ height: "100%" }}
      onSelectEvent={onClickEvent}
      eventPropGetter={eventStyleGetter}
      components={{
        event: calendarEvent
      }}
    />
  )
}