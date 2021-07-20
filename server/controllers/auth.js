const User = require("../models/Users");

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({ username, email, password });
		res.status(201).json({
			success: true,
			user: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.login = (req, res, next) => {
	res.send("Login route");
};

exports.forgotPassword = (req, res, next) => {
	res.send("Forgot Password route");
};

exports.resetPassword = (req, res, next) => {
	res.send("Reset Password route");
};
