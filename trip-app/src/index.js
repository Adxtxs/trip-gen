import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css';
import Login from './components/login';
import HomePage from './components/home';
import SignUp from './components/signup';
import Navbar from './components/navbar';
import reportWebVitals from './reportWebVitals';
import TravelForm from './components/create-itinerary';
import DisplayItinerary from './components/display-itinerary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/createItinerary" element={<TravelForm/>} />
        <Route path="/displayItinerary" element={<DisplayItinerary/>} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
