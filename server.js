const express = require("express");
const app = express();
app.use(express.json());
// app.use(express.static(path.join(__dirname, "js")));
app.use(express.static("public"));

app.get("/", (request, response) => {
	response.sendFile("index.html", { root: __dirname });
});
app.get("/script.js", (request, response) => {
	// Adding script.js to the server like this because of problem with file type or directory
	response.type("application/javascript");
	response.sendFile("script.js", { root: __dirname });
});

app.get("/login", (request, response) => {
	response.sendFile("login.html", { root: __dirname });

	// const username = request.query.username;
	// const password = request.query.password;
	// console.log("u", username);
	// if (username === "admin" && password === "password") {
	// 	// If the username and password are correct, send a success message
	// 	response.send("Login successful");
	// } else {
	// 	// If the username and password are incorrect, send an error message
	// 	response.status(401).send("Error: Invalid username or password");
	// }
});
app.post("/login", (request, response) => {
	//
	console.log(request.body.username, request.body.password);
	//now save and check in database
});

app.listen(8080, () => {
	console.log("Server listening on port 8080");
});
