// stupid name for a file - this is a route that the user should not be able to visit if they are logged in

import React, { useContext } from 'react'
import { Redirect, Route, RouteProps, } from 'react-router-dom'
import { UserContext } from '../../state/userState'
import { isUserLoggedIn } from '../../utils/userUtils';
import { Location } from 'history';

interface HistoryState { from : string } 

export const ReversePrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useContext(UserContext) 
  
  return (
    <Route
      {...rest}
      render={({ history }) => {
        console.log(history);
        const location = history.location as Location<HistoryState>
        
        
        return isUserLoggedIn(user) ? <Redirect to={`${location.state ? location.state.from : '/home' }`}  /> : ( children )
      }}
    />
  )
}