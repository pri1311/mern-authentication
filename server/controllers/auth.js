const User = require("../models/Users");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({ username, email, password });
		sendToken(user, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return next(new ErrorResponse("Invalid Credentials.", 401));
		}

		const isMatch = await user.matchPassword(password);
		if (isMatch) {
			sendToken(user, 200, res);
		} else {
			return next(new ErrorResponse("Invalid Credentials.", 401));
		}
	} catch (error) {
		next(error);
	}
};

exports.forgotPassword = (req, res, next) => {
	res.send("Forgot Password route");
};

exports.resetPassword = (req, res, next) => {
	res.send("Reset Password route");
};

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({
		success: true,
		user: user,
		token: token,
	});
};
