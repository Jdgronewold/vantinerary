import React from 'react'
import { EventProps } from 'react-big-calendar'
import { flexStyles } from '../../utils/styleUtils'

export const calendarEvent: React.FC<EventProps> = ({ event }: EventProps) => {

  return (
    <div
      style={{
        height: '15px',
        width: '90%',
        backgroundColor: 'transparent',
        ...flexStyles({})
      }}>
      <div
        style={{
          borderRadius: '50%',
          height: 6,
          width: 6,
          backgroundColor: '#ff4081',
          marginRight: '6px'
        }}
      />
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '10px'
        }}>
          {event.title}
        </span>
    </div>
  )
}

export const eventStyleGetter = () => ({
  style: { backgroundColor: 'transparent', color: '#ff4081' }
})