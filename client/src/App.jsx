import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './components/FontawesomeIcons/index.js';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import LoadingScreen from './components/LoadingScreen';
import { useAuth } from './useAuth.jsx';
import UserContext from './UserContext.js';
import './App.css';
import { ToastContainer } from 'react-toastify';

import { loginNotify, registerNotify, logoutNotify } from './Notifications.js';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  let { authenticated, isLoading, setIsLoading, setAuthentication } = useAuth();
  console.log('render App.jsx, auth: ', authenticated);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <UserContext.Provider value={{ authenticated, isLoading, setIsLoading, setAuthentication, loginNotify, registerNotify, logoutNotify }}>
        <Routes>
          <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={authenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </UserContext.Provider>
      <ToastContainer />
    </>
  );
}
export default App;
