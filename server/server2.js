const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
// const flash = require('connect-flash');
const { response } = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const config = require("./config");
const uri = config.mongoURI;
app.use(cors());
// app.use(
//   cors({
//     origin: "https://fnvzol-5174.preview.csb.app/*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use(require("connect-flash")());
// app.use(function (req, res, next) {
//   res.locals.messages = require("express-messages")(req, res);
//   next();
// });//

app.use(cookieParser());
app.use(express.json());
app.use(
	session({
		secret: "my-sgfrdesgfr6grdterdgrtegerggre432ecret", // a secret key to sign the session ID cookie
		cookie: { maxAge: Infinity },
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

app.get("/", authenticate, (request, response) => {
	//   const messages = request.flash("success");
	response.sendFile("index.html", { root: __dirname });
});

// app.get(["/register", "/login"], notAuthenticated, (request, response) => {
// 	response.sendFile(`${request.path.substring(1)}.html`, { root: __dirname });
// });

// app.get(
// 	["/src/register-script.js", "/src/login-script.js"],
// 	(request, response) => {
// 		response.type("application/javascript");
// 		response.sendFile(request.path, { root: __dirname });
// 	}
// );

app.post("/register", (request, response) => {
	const { username, password } = request.body;
	const newUser = new User({ username, password });

	console.log("server.js,/register,newUser: ", newUser);
	const validationError = newUser.validateSync({ username, password });
	if (validationError) {
		const { message } = validationError.errors.password;
		console.log(message);
		return response.status(400).send({ error: message });
	}
	newUser.save((error) => {
		if (error) {
			response.status(500).send("Error saving user to database");
		} else {
			console.log("user yes");
			//   request.flash("success", "You are now registered and can log in");
			response.status(200).json({ redirect: "/login" });
		}
	});
});

app.post("/loginY", (request, response) => {
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

		User.findOne({ username }).then((user) => {
			if (!user) {
				return response.status(404).send("User not found");
			}
			bcrypt.compare(password, user.password).then((isMatching) => {
				if (isMatching) {
					password = user.password;
					request.session.authenticated = true;
					request.session.user = {
						username,
						password,
					};
					//add a flash message, to append a success login message in the navigation bar
					response.status(200).json({ redirect: "/" });
				} else {
					response.status(401).send("Incorrect password");
				}
			});
		});
	} catch (err) {
		response.status(500).send("An error occured");
		console.log(err);
	}
});

app.get("/logout", (request, response) => {
	request.session.destroy(function (err) {
		if (err) {
			console.log("logout error", err);
		} else {
			response.clearCookie("connect.sid");
			response.redirect("/login");
		}
	});
});
app.get("/test-connection", (request, response) => {
	response.setHeader("Content-Type", "application/json");
	response.send({ siema: ["eniu", "enku", "enieczku"] });
});

app.post("/login", (req, res) => {
	console.log("Bbb", req.body);
	const { username, password } = req.body;
	res.status(200).send({
		access: true,
		message: `user ${username} successfully login, authorization granted <cookie>`,
	});
});
// app.get("/loginx", (req, res) => {
//   //   console.log("Aaa");
//   //   res.status(200).send("Current yes");
//   res.send("hello321312");
// });

app.listen(port, () => {
	console.log("http://localhost:8080/");
});
function authenticate(req, res, next) {
	if (req.session.authenticated) {
		console.log("AUTHENTICATed");
		next();
	} else {
		console.log("NOT AUTHenticated");
		res.redirect("/login");
	}
}
function notAuthenticated(req, res, next) {
	if (!req.session.authenticated) {
		next();
	} else {
		res.redirect("/");
	}
}
