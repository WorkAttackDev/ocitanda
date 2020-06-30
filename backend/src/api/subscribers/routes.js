const router = require("express").Router();

const { body } = require("express-validator");
const { handleValidationError, isId } = require("../validations");
const Subscriber = require("./model");
const { subscriber } = require("../../constants/tableNames");
const { subscribeEmail } = require("../email");

router.get("/", async (req, res) => {
  try {
    const cartItem = Subscriber.query();
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isId, async (req, res, next) => {
  handleValidationError(req, res, next);
  const { id } = req.params;
  try {
    const subscriber = await Subscriber.query().findById(id);
    res.json(subscriber);
  } catch (error) {
    next(error);
  }
});

router.post("/", [body("email", "email invalido")], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { email } = req.body;
  try {
    const exists = await Subscriber.query().where({ email }).first();
    if (exists) throw new Error("email already exists");

    await Subscriber.query().insert({ email });
    await subscribeEmail(email);
    res.status(201);
    res.json({ message: "subscribed successfuly" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", [isId], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { id } = req.params;
  try {
    await subscriber.query().deleteById(id);
    res.status(200);
    res.json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
