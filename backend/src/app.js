const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const cron = require("node-cron");

const apiRoutes = require("./api");
const { errorHandler, notFound } = require("./middleware");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan("tiny"));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
app.use("/api/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "Ocitanda API!!!",
  });
});

cron.schedule("00 00 00 * * *", () => {
  console.log(`one minute passed, image downloaded`);
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);
module.exports = app;
