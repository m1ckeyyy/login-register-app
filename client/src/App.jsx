import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import LoadingScreen from './components/LoadingScreen';
import Cookies from 'js-cookie';

import './App.css';

function App() {
  const [authenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/auth', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Unauthorized');
      })
      .then((res) => {
        setAuthentication(res.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setAuthentication(false);
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (authenticated) {
      console.log('authenticated: ', authenticated);
    } else {
      console.log('else authenticated: ', authenticated);
    }
  }, [authenticated]);

  // fetch("http://localhost:8080/auth", {
  // 	method: "GET",
  // 	mode: "cors",
  // 	headers: {
  // 		Authorization: `Bearer ${Cookies.get("access_token")}`,
  // 	},
  // })
  // 	.then((res) => {
  // 		if (res.ok) {
  // 			res = res.json();
  // 			return res;
  // 		}
  // 		throw new Error("Unauthorized");
  // 	})
  // 	.then((res) => {
  // 		console.log(res);
  // 		setData(res.user);
  // 	})
  // 	.catch((error) => {
  // 		setData(false);
  // 		console.error(error);
  // 	});

  //fetch localhost8080/authUser (server) and get isUserAuthenticated from JWT
  //if has token Route path='/' element {<Home/>}
  //if no token Route path='/' element {<Login/>}
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Home /> : <Login />} />
        <Route path="/login" element={authenticated ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    // <div className="main">
    //   {typeof data.siema === "undefined" ? (
    //     <p>Loading....</p>
    //   ) : (
    //     data.siema.map((eniek, i) => <p key={i}>{eniek}</p>)
    //   )}
    // </div>
  );
}
export default App;
