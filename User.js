const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		validate: {
			validator: function (value) {
				return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
			},
		},
	},
});
userSchema.pre("save", function (next) {
	const user = this;

	bcrypt.hash(user.password, 10, function (error, hashedPassword) {
		if (error) {
			console.log("hashed fail");
			return next(error);
		}
		console.log("hash sucesfuli set");
		user.password = hashedPassword;
		next();
	});
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
