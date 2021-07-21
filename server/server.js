require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
	console.log("Database connected");
});

app.use("/auth", require("./routes/auth"));
app.use("/private", require("./routes/private"));

//error handlerr should be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
	console.log(`Logged error: ${err.message}`);
	server.close(() => process.exit(1));
});
