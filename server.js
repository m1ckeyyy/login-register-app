const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const uri =
	"mongodb+srv://mikolaj:qGrF7clrl1sjp8R9@mikolaj-cluster.sofrp4a.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
	try {
		await mongoose.connect(uri);
		console.log("Successfully connected to MongoDB");
	} catch (err) {
		console.error(error);
	}
}
connect();

const User = require("./User");

// const userSchema = new mongoose.Schema({
// 	username: String,
// 	password: String,
// });
// const User = mongoose.model("User", userSchema);

app.get("/", (request, response) => {
	response.sendFile("index.html", { root: __dirname });
});

app.get("/src/register-script.js", (request, response) => {
	// Adding script.js to the server like this because of problem with file type or directory
	response.type("application/javascript");
	response.sendFile("src/register-script.js", { root: __dirname });
});

app.get("/register", (request, response) => {
	response.sendFile("register.html", { root: __dirname });

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

app.post("/register", (request, response) => {
	// console.log("registered: ", request.body.username, request.body.password);

	const newUser = new User({
		username: request.body.username,
		password: request.body.password,
	});
	newUser.save((error) => {
		if (error) {
			// There was an error saving the user
			response.status(500).send("Error saving user to database");
		} else {
			// The user was saved successfully
			console.log("user yes");
			response.send("User registered successfully");
		}
	});
});

app.get("/src/login-script.js", (request, response) => {
	// Adding script.js to the server like this because of problem with file type or directory
	response.type("application/javascript");
	response.sendFile("src/login-script.js", { root: __dirname });
});

app.get("/login", (request, response) => {
	response.sendFile("login.html", { root: __dirname });
});
app.post("/login", (request, response) => {
	console.log("logged in: ", request.body.username, request.body.password);
	//now save and check in database

	const username = request.body.username;
	const password = request.body.password;

	User.findOne({ username, password }, (err, user) => {
		if (err) {
			response.status(500).send("Error: " + err);
			console.log("error during browsing through db");
		} else if (!user) {
			response.status(401).send("Error: Invalid username or password");
			console.log("user not found!!!");
		} else {
			console.log("Login successful!!");
		}
	});
});

app.listen(8080, () => {
	console.log("Server listening on port 8080");
});
