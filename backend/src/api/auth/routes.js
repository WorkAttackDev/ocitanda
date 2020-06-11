const router = require("express").Router();
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const { handleValidationError } = require("../validations");
const { sign } = require("../util");
const { format } = require("fecha");

const User = require("../users/model");
const Consumer = require("../consumers/model");

const loginValidation = [
  body("email", "Incorrect email").isString().isEmail(),
  body("password", "Incorrect password").isString().isLength({ min: 8 }),
];

const signupValidation = [
  ...loginValidation,
  body("name").isString().notEmpty().trim(),
  body("phone").isString().isLength({ min: 9, max: 9 }).isNumeric(),
  body("imageUrl").isString().not().isEmpty(),
  body("gender").isString().not().isEmpty().isLength({ max: 1 }),
  body("birthDate").not().isEmpty().toDate(),
];

const throwErrorIf = (res, condition, errorMsg, status = 500) => {
  if (condition) {
    const error = new Error(errorMsg);
    res.status(status);
    throw error;
  }
};

router.post("/signup", signupValidation, async (req, res, next) => {
  handleValidationError(req, res, next);
  const { name, email, birthDate, imageUrl, gender, phone } = req.body;
  console.log(birthDate);
  const trx = await Consumer.startTransaction();

  try {
    const existUser = await User.query()
      .where({ email: email.toLowerCase() })
      .first();

    throwErrorIf(res, existUser, "user Already exists", 403);

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const { user } = await Consumer.query(trx).insertGraph({
      birth_date: format(birthDate, "YYYY-MM-DD HH:mm:ss"),
      gender,

      user: {
        name,
        email: email.toLowerCase(),
        phone,
        image_url: imageUrl,
        password: hashedPassword,
      },
    });

    await trx.commit();

    delete user.password;

    const token = await sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.json({ user, token });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
});

router.post("/login", loginValidation, async (req, res, next) => {
  handleValidationError(req, res, next);
  const { email, password } = req.body;
  try {
    const user = await User.query().where({ email }).first();

    throwErrorIf(res, !user, "user does not exists", 403);

    const isValidPassword = await bcrypt.compare(password, user.password);

    throwErrorIf(res, !isValidPassword, "invalid password", 403);

    delete user.password;

    const token = await sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    res.status(201);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
