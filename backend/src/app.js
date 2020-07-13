const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const apiRoutes = require("./api");
const { errorHandler, notFound } = require("./middleware");


const app = express();

app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use("/api/static", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Ocitanda API!!!",
  });
});


app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);
module.exports = app;
