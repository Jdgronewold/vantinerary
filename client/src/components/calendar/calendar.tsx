import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export const VanCalendar = () => {
  return (
    <Calendar
      events={[]}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      localizer={localizer}
      defaultView="month"
      style={{ height: "100vh" }}
    />
  )
}