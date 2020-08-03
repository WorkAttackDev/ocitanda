const router = require("express").Router();

const { handleValidationError, isId } = require("../validations");

const Category = require("./model");
const { body } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.query();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", [isId], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { id } = req.params;
  try {
    const category = await Category.query().select().where("id", id).first();

    if (!category) {
      res.status(404);
      res.json({});
    } else {
      res.json(category);
    }
  } catch (error) {
    next(error);
  }
});

const validateName = body("name").notEmpty().isString();

router.post("/", [validateName], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { name } = req.body;
  try {
    const category = await Category.query().insert({ name });
    res.status(201).json({ message: "successfuly created", category });
  } catch (error) {
    next(error);
  }
});

router.post("/:id", [isId, validateName], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.query()
      .findById(id)
      .patchAndFetchById(id, { name });
    res.status(200).json({ message: "successfuly updated", category });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", [isId], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { id } = req.params;
  try {
    await Category.query().deleteById(id);
    res.status(200).json({ message: "successfuly deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
