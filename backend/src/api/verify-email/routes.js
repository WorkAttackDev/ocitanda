const router = require("express").Router();

const { body, query } = require("express-validator");
const { throwErrorIf } = require("../util");
const { handleValidationError } = require("../validations");
const crypto = require("crypto");
const { verifyEmail } = require("../email");
const User = require("../users/model");

router.get(
  "/",
  [query("token", "Invalid Token").notEmpty()],
  async (req, res, next) => {
    handleValidationError(req, res, next);
    const { token } = req.query;
    try {
      const existToken = await User.query()
        .where("reset_password_token", token)
        .where("reset_password_expires_date", ">", Date.now())
        .first();

      throwErrorIf(res, !existToken, "Token don't exist", 403);

      const trx = await User.startTransaction();

      await User.query(trx).where("reset_password_token", token).patch({
        verified: true,
        reset_password_token: "",
        reset_password_expires_date: 0,
      });

      trx.commit();

      res.status(200).json({ message: "Valid Token" });
    } catch (error) {
      trx.rollback();
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

      const info = await verifyEmail(
        existUser.email,
        "http://localhost:3000/validate-email/" + token
      );

      console.log(info);
      

      res.status(200).json({ message: "verify email sent" });
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
