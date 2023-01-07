const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const uri =
	"mongodb+srv://mikolaj:qGrF7clrl1sjp8R9@mikolaj-cluster.sofrp4a.mongodb.net/?retryWrites=true&w=majority";
mongoose
	.connect(uri)
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch((error) => console.error(error));

// connect();

const User = require("./User");

app.get("/", (request, response) => {
	response.sendFile("index.html", { root: __dirname });
});

app.get(["/register", "/login"], (request, response) => {
	response.sendFile(`${request.path.substring(1)}.html`, { root: __dirname });
});

app.get(
	["/src/register-script.js", "/src/login-script.js"],
	(request, response) => {
		response.type("application/javascript");
		response.sendFile(request.path, { root: __dirname });
	}
);

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

// app.get("/register", (request, response) => {
// 	response.sendFile("register.html", { root: __dirname });
// });

// app.get("/login", (request, response) => {
// 	response.sendFile("login.html", { root: __dirname });
// });
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
