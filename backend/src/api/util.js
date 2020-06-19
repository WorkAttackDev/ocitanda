const jwt = require("jsonwebtoken");

const sign = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });

const throwErrorIf = (res, condition, errorMsg, status = 500) => {
  if (condition) {
    const error = new Error(errorMsg);
    res.status(status);
    throw error;
  }
};

module.exports = {
  sign,
  throwErrorIf
};
