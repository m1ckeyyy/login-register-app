const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});
const User = mongoose.model("User", userSchema);
userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		bcrypt.hash(this.password, 8, (err, hash) => {
			if (err) return next(err);
			this.password = hash;
			next();
		});
	}
});
module.exports = mongoose.model("User", userSchema);
