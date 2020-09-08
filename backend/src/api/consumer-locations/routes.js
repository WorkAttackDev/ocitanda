const router = require("express").Router();
const { body } = require("express-validator");
const { handleValidationError, isId } = require("../validations");

const ConsumerLocation = require("./model");

const MESSAGES = {
  UPDATED: "UPDATED",
  CREATED: "CREATED",
  DELETED: "DELETED",
  DONE: "DONE",
};

const validateConsumerLocation = [
  body(["consumer_id"]).isInt({ allow_leading_zeroes: false }),
  body(["neighborhood", "street", "house", "details", "extra_phone"])
    .notEmpty()
    .isString(),
];

router.get("/", async (req, res, next) => {
  try {
    const locations = await ConsumerLocation.query();
    res.json({ message: MESSAGES.DONE, value: locations });
  } catch (error) {
    next(error);
  }
});

router.get("/consumer/:id", async (req, res, next) => {
  // if (handleValidationError(req, res, next)) return null;
  const { id } = req.params;

  try {
    const locations = await ConsumerLocation.query().where({ consumer_id: id });

    res.json({ message: MESSAGES.DONE, value: locations });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateConsumerLocation, async (req, res, next) => {
  if (handleValidationError(req, res, next)) return null;

  const {
    neighborhood,
    street,
    house,
    details,
    extra_phone,
    consumer_id,
  } = req.body;

  const newLocation = {
    neighborhood,
    street,
    house,
    details,
    extra_phone,
    consumer_id,
  };

  const trx = await ConsumerLocation.startTransaction();

  try {
    const location = await ConsumerLocation.query(trx).insertAndFetch(
      newLocation
    );

    await trx.commit();

    res.json({ message: MESSAGES.CREATED, value: location });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  // if (handleValidationError(req, res, next)) return null;
  const { id } = req.params;

  const trx = await ConsumerLocation.startTransaction();
  try {
    await ConsumerLocation.query(trx).where({ id }).patch({ deleted: true });
    await trx.commit();
    res.json({ message: MESSAGES.DELETED });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  // if (handleValidationError(req, res, next)) return null;
  const { id } = req.params;

  const trx = await ConsumerLocation.startTransaction();
  try {
    await ConsumerLocation.query(trx).deleteById(id);
    await trx.commit();
    res.json({ message: MESSAGES.DELETED });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
});

module.exports = router;
