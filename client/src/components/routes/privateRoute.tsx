import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { UserContext } from '../../state/userState'
import { isUserLoggedIn } from '../../utils/userUtils';


export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useContext(UserContext) 
  
  return (
    <Route
      {...rest}
      render={() => {
        return isUserLoggedIn(user) ? ( children ) : <Redirect to={'/welcome'} />
      }}
    />
  )
}