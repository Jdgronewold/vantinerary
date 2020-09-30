import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/header';
import { UserProvider } from './components/context/userState'
import './App.css';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <BrowserRouter>
          <div>
            
          </div>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
