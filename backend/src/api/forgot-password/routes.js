const router = require("express").Router();

const { body, query } = require("express-validator");
const { throwErrorIf } = require("../util");
const { handleValidationError } = require("../validations");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { resetPasswordEmail } = require("../email");
const User = require("../users/model");

router.get(
  "/",
  [query("token", "Invalid Token").not().isEmpty()],
  async (req, res, next) => {
    console.log(req.query);
    handleValidationError(req, res, next);
    const { token } = req.query;
    try {
      const existToken = await User.query()
        .where("reset_password_token", token)
        .where("reset_password_expires_date", ">", Date.now())
        .first();

      throwErrorIf(res, !existToken, "Token don't exist", 403);

      res.status(200).json({ message: "Valid Token" });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  [body("email", "Invalid Email").isEmail()],
  async (req, res, next) => {
    handleValidationError(req, res, next);
    const { email } = req.body;
    try {
      const existUser = await User.query()
        .where({ email: email.toLowerCase() })
        .first();

      throwErrorIf(res, !existUser, "User don't exist", 403);

      const token = crypto.randomBytes(20).toString("hex");

      await User.query()
        .findById(existUser.id)
        .patch({
          reset_password_token: token,
          reset_password_expires_date: Date.now() + 3600000,
        });

      const info = await resetPasswordEmail(
        existUser.email,
        "http://localhost:3000/reset-password/" + token
      );
      console.log(info);

      res.status(200).json({ message: "Recovery email sent" });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/",
  [
    body("password", "Invalid Password").not().isEmpty().isLength({ min: 8 }),
    body("token", "Invalid Token").not().isEmpty(),
  ],
  async (req, res, next) => {
    handleValidationError(req, res, next);
    const { password, token } = req.body;

    const trx = await User.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      await User.query(trx).where("reset_password_token", token).patch({
        password: hashedPassword,
        reset_password_token: "",
        reset_password_expires_date: 0,
      });

      trx.commit();

      res.status(201).json({ message: "password updated successfuly" });
    } catch (error) {
      trx.rollback();
      next(error);
    }
  }
);

module.exports = router;
