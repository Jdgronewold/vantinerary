import React, { useContext, useMemo } from 'react'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import { INote, NoteContext } from '../../state'
import { calendarEvent, eventStyleGetter } from './event'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { formatDate } from '../../utils/noteUtils'

const localizer = momentLocalizer(moment)

export const VanCalendar = () => {
  const { notes } = useContext(NoteContext)

  const transformNotes = (notes: INote[]): Event[] => {
    return notes.map((note: INote): Event => ({
      start: note.date,
      end: note.date,
      title: note.title || formatDate(note.date),
      allDay: true,
      resource: note
    }))
  }
  const memoNotes = useMemo(() => transformNotes(notes), [notes])

  return (
    <Calendar
      events={memoNotes}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      localizer={localizer}
      defaultView="month"
      style={{ height: "100%" }}
      eventPropGetter={eventStyleGetter}
      components={{
        event: calendarEvent
      }}
    />
  )
}