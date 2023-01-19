import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

import "./App.css";

function App() {
	// const [data, setData] = useState([{}]);
	// useEffect(() => {
	// 	fetch("http://localhost:8080/test-connection")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data))
	// 		.catch((e) => console.error("eror: ", e));
	// }, []);
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
