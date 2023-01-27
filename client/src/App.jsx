import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

// function useComponentBasedOnPath() {
//   const { authenticated, isLoading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   return [authenticated, isLoading];

//   // useEffect(() => {
//   //   if (authenticated) {
//   //     navigate('/');
//   //   } else {
//   //     navigate('/login');
//   //   }
//   // }, [authenticated]);

//   // const [component, setComponent] = useState(null);

//   // useEffect(() => {
//   //   if (location.pathname === '/') {
//   //     setComponent(<Home />);
//   //   } else if (location.pathname === '/login') {
//   //     setComponent(<Login />);
//   //   }
//   // }, [location]);
// }

function App() {
  // const [authenticated, isLoading] = useComponentBasedOnPath();

  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, isLoading, setAuthentication } = useAuth();
  console.log('render App.jsx, auth: ', authenticated);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login setAuthentication={setAuthentication} />} />
      <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}
export default App;
