const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});
userSchema.pre("save", function (next) {
	const user = this;

	bcrypt.hash(user.password, 10, function (error, hashedPassword) {
		if (error) {
			return next(error);
		}
		user.password = hashedPassword;
		next();
	});
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
