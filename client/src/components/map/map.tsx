import React from 'react'
import GoogleMapReact from 'google-map-react'



export const Map: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultZoom={10}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={{ lat: 40.0150, lng: -105.2705}}
        >
          
        </GoogleMapReact>
      </div>
  )
}