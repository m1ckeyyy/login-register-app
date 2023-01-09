const express = require("express");
const mongoose = require("mongoose");
// const session = require("express-session");
const app = express();
const port = process.env.PORT || 8080;
const config = require("./config");
const uri = config.mongoURI;
app.use(express.json());

// app.use(
// 	session({
// 		secret: "my-sgfrdesgfr6grdterdgrtegerggre432ecret", // a secret key to sign the session ID cookie
// 		resave: false, // don't save the session if it wasn't modified
// 		saveUninitialized: false, // don't create a session until something is stored
// 	})
// );
mongoose.set("strictQuery", true); //to suppress warning in console
mongoose
	.connect(uri)
	.then(() => console.log("Successfully connected to MongoDB"))
	.catch((error) => console.error(error));

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

app.post("/login", (request, response) => {
	console.log(
		"logging in: ",
		request.body.username,
		request.body.password,
		"..."
	);
	//now save and check in database

	const username = request.body.username;
	const password = request.body.password;

	User.findOne({ username, password }, (err, user) => {
		if (err) {
			response.status(500).send("Error: " + err);
			console.log("error with MongoDB");
		} else if (!user) {
			response.status(401).send("Error: Invalid username or password");
			console.log("user not found!!!");
		} else {
			console.log("Login successful!!");
		}
	});
});

app.listen(port, () => {
	console.log("Server listening on port 8080");
});
