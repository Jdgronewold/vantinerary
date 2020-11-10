import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Header } from './components/header/header';
import { UserProvider, NotesProvider, AppProvider } from './state'
import { Login } from './components/login/login'
import { Splash } from './components/splash/splash'
import { PrivateRoute } from './components/routes/privateRoute'
import { ReversePrivateRoute } from './components/routes/reversePrivateRoute'
import { AxiosConfig } from './components/axiosConfig/axiosConfig'
import { HomePage } from './components/home/homepage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NotesProvider>
          <AppProvider>
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
          </AppProvider>
        </NotesProvider>
      </UserProvider>
    </div>
  );
}

export default App;
