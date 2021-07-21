const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordDate: {
		type: Date,
	},
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
		return;
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
