const { join } = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const { errorHandler, notFound } = require("./middleware");
const apiRoutes = require("./api");

const app = express();
app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
	"/images/products",
	express.static(join(__dirname, "static", "images"))
);

app.get("/", (req, res) => {
	res.json({
		message: "Ocitanda API!!!",
	});
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);
module.exports = app;
