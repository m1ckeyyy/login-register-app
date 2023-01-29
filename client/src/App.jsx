import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import LoadingScreen from './components/LoadingScreen';
import { useAuth } from './useAuth.jsx';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  let { authenticated, isLoading, setIsLoading, setAuthentication } = useAuth();

  console.log('render App.jsx, auth: ', authenticated);
  var newDate;
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Routes>
      <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login setAuthentication={setAuthentication} />} />
      <Route path="/register" element={authenticated ? <Navigate to="/" /> : <Register setAuthentication={setAuthentication} />} />
      <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}
export default App;
