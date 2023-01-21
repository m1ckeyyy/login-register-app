import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  // const [data, setData] = useState([{}]);


  fetch("https://fnvzol-8080.preview.csb.app/auth", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("authorizeUser receive from fetch data: ", data);
    })
    .catch((error) => {
      console.error(
        "Failed to fetch, check if server is up and running: ",
        error
      );
    });


  //fetch localhost8080/authUser (server) and get isUserAuthenticated from JWT
  //if has token Route path='/' element {<Home/>}
  //if no token Route path='/' element {<Login/>}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
