import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../state/userState'
import axios from 'axios'
import { clearTokenAndUser } from '../../utils/userUtils'
import { logoutUser } from '../../actions/userActions'

export const AxiosConfig: React.FC = ({ children}) => {
  const { userDispatch } = useContext(UserContext)

  console.log('RENDERED AXIOS');
  
  axios.interceptors.response.use(response => {
    console.log('HELLO', response);
    
    return response;
  }, error => {
    console.log(error.response);
    debugger
    if (error.response.status === 401) {
      userDispatch(logoutUser())
      clearTokenAndUser()
    }
    
    return Promise.reject(error);
  });

  return (
    <div className='AXIOS'>
      { children }
    </div>
  )
}