import React, { useReducer, useState, useEffect } from 'react'
import { AppActions, AppActionTypes } from '../actions/appActions'

export interface AppState {
  mainView: 'calendar' | 'map'
}


interface AppContextType extends AppState {
  appDispatch: React.Dispatch<AppActions>
}

export const AppContext = React.createContext<AppContextType>({
  mainView: 'calendar',
  appDispatch: () => {}
})

function appReducer(state: AppState, action: AppActions): AppState {
  switch(action.type) {
    case AppActionTypes.SWITCH_MAIN_VIEW: {
      return { mainView: action.payload }
    }
    default:
      return state
  }
}

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [ { mainView }, appDispatch] = useReducer(appReducer, { mainView: 'calendar' })
  const [contextValue, setContext] = useState<AppContextType>({ mainView, appDispatch })

  useEffect(() => {
    setContext((contextValue: AppContextType) => ({
      ...contextValue,
      mainView
    }))
  }, [mainView])

  return (
    <AppContext.Provider value={contextValue}>
      { children }
    </AppContext.Provider>
  )
}



