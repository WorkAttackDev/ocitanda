const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  let decodedToken;
  try {
    const token = req.get("Authorization").split(" ")[1];
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    next(error);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    res.status(401);
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
}

function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    errorStack: error.errorStack,
    stack: process.env.NODE_ENV === "production" ? "error stack" : error.stack,
  });
  // next(error);
}

module.exports = {
  notFound,
  errorHandler,
  isAuth,
};
