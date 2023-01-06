const express = require("express");
const app = express();
app.use(express.json());

// Define a route for the root path
app.get("/", (request, response) => {
	// Send the index.html file as the response
	response.sendFile("index.html", { root: __dirname });
});

// Define a route for the '/login' path
app.get("/login", (request, response) => {
	// Get the username and password from the query string
	const username = request.query.username;
	const password = request.query.password;

	if (username === "admin" && password === "password") {
		// If the username and password are correct, send a success message
		response.send("Login successful");
	} else {
		// If the username and password are incorrect, send an error message
		response.status(401).send("Error: Invalid username or password");
	}
});

// Start the server and listen for incoming requests on port 8080.
app.listen(8080, () => {
	console.log("Server listening on port 8080");
});
