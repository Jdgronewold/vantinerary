import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import { StateManager } from './state/stateManager'
import { Login } from './components/login/login'
import { Splash } from './components/splash/splash'
import { PrivateRoute } from './components/routes/privateRoute'
import { ReversePrivateRoute } from './components/routes/reversePrivateRoute'
import { AxiosConfig } from './components/axiosConfig/axiosConfig'
import { HomePage } from './components/home/homepage';

import './App.scss';

function App() {
  console.log(process.env.PUBLIC_URL)
  return (
    <div className="App">
      <StateManager>
        <AxiosConfig>
          <BrowserRouter>
            <Header />
            <Switch>
              <ReversePrivateRoute exact path="/login" ><Login /></ReversePrivateRoute>
              <ReversePrivateRoute exact path={["/", "/welcome"]} ><Splash /></ReversePrivateRoute>
              <PrivateRoute path={'/home'}> <HomePage /> </PrivateRoute>
            </Switch>
          </BrowserRouter>
        </AxiosConfig>
      </StateManager>
    </div>
  );
}

export default App;
