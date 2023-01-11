const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { response } = require("express");
const app = express();
const port = process.env.PORT || 8080;
const config = require("./config");
const uri = config.mongoURI;

app.use(express.json());
app.use(
	session({
		secret: "my-sgfrdesgfr6grdterdgrtegerggre432ecret", // a secret key to sign the session ID cookie
		cookie: { maxAge: 30000 },
		resave: false, // don't save the session if it wasn't modified
		saveUninitialized: true, // don't create a session until something is stored
	})
);
mongoose.set("strictQuery", false); //supress warning
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
	// console.log("registering: ", request.body.username, request.body.password);

	const newUser = new User({
		username: request.body.username,
		password: request.body.password,
	});
	console.log(newUser);
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
	//check first if user is logged in
	console.log(
		"logging in: ",
		request.body.username,
		request.body.password,
		"..."
	);
	let username, password;
	try {
		username = request.body.username;
		password = request.body.password;
		if (!username || !password) return response.status(404).send("A123");
		//first find username
		User.findOne({ username }).then((user) => {
			if (!user) {
				// console.log('user nono')
				return response.status(404).send("User not found");
			}
			bcrypt.compare(password, user.password).then((isMatching) => {
				if (request.session.authenticated) {
					response.json(request.session);
				} else {
					if (isMatching) {
						request.session.authenticated = true;
						request.session.user = {
							username,
							password,
						};
						response.json(request.session);
						// response.send("Logged in successfully");
					} else {
						response.status(401).send("Incorrect password");
					}
				}
			});
		});
	} catch (err) {
		response.status(500).send("An error occured");
		console.log(err);
	}
	// console.log(request.sessionID, request.session.authenticated);
	// if (request.session.authenticated) {
	// 	response.json(request.session);
	// } else {
	// 	if(password)
	// 	request.session.user = {
	// 		username,
	// 		password,
	// 	};
	// }
	// response.status(200); //success
});

app.listen(port, () => {
	console.log("Server listening on port 8080");
});
