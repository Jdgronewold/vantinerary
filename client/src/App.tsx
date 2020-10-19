import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import { UserProvider } from './state/userState'
import { Login } from './components/login/login'
import { Splash } from './components/splash/splash'

import './App.scss';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path={["/", "/welcome"]} component={Splash} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
