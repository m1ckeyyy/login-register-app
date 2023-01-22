import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import LoadingScreen from './components/LoadingScreen';
import { useAuth } from './useAuth';
import './App.css';

function useComponentBasedOnPath() {
  const { authenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [authenticated]);

  const [component, setComponent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setComponent(<Home />);
    } else if (location.pathname === '/login') {
      setComponent(<Login />);
    }
  }, [location]);

  return [component, isLoading];
}

function App() {
  const [component, isLoading] = useComponentBasedOnPath();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={component} />
      <Route path="/" element={component} />
    </Routes>
  );

  // <div className="main">
  //   {typeof data.siema === "undefined" ? (
  //     <p>Loading....</p>
  //   ) : (
  //     data.siema.map((eniek, i) => <p key={i}>{eniek}</p>)
  //   )}
  // </div>
}
export default App;
