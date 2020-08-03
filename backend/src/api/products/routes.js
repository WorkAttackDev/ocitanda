const router = require("express").Router();
const Product = require("./model");
const Category = require("../categories/model");
const fileUpload = require("../../middleware/file-upload");
const { body, param } = require("express-validator");
const { handleValidationError, isId } = require("../validations");
const { throwErrorIf } = require("../util");

const productValidation = [
  body(["name", "description"]).isString().not().isEmpty(),
  body("price").isNumeric(),
  body(["producerId", "categoryId", "quantity"]).isInt({ min: 1 }),
];

//* routes

router.get("/", async (req, res, next) => {
  const limit =
    !isNaN(req.query.limit) && req.query.limit > 2 ? req.query.limit : 10;
  const page =
    !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
  const order =
    !isNaN(req.query.order) && req.query.order > 0 && req.query.order <= 4
      ? req.query.order
      : 1;

  const orderTable = {
    1: { col: "name", dir: "asc" },
    2: { col: "name", dir: "desc" },
    3: { col: "price", dir: "asc" },
    4: { col: "price", dir: "desc" },
  };
  try {
    const category = !(req.query.category.toLowerCase() === "todos")
      ? await Category.query().where({ name: req.query.category }).first()
      : null;

    let products;

    if (category) {
      products = await Product.query()
        .where("deleted", false)
        .andWhere("category_id", category.id)
        .offset(page * limit)
        .limit(limit)
        .orderBy(orderTable[order].col, orderTable[order].dir);
      res.json(products);
    } else {
      products = await Product.query()
        .where("deleted", false)
        .offset(page * limit)
        .limit(limit)
        .orderBy(orderTable[order].col, orderTable[order].dir);
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/admin", async (req, res, next) => {
  const limit =
    !isNaN(req.query.limit) && req.query.limit > 2 ? req.query.limit : 10;
  const page =
    !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
  const order =
    !isNaN(req.query.order) && req.query.order > 0 && req.query.order <= 4
      ? req.query.order
      : 1;

  const orderTable = {
    1: { col: "name", dir: "asc" },
    2: { col: "name", dir: "desc" },
    3: { col: "price", dir: "asc" },
    4: { col: "price", dir: "desc" },
  };

  try {
    const category = !(req.query.category.toLowerCase() === "todos")
      ? await Category.query().where({ name: req.query.category }).first()
      : null;

    let products;

    if (category) {
      products = await Product.query()
        .where("category_id", category.id)
        .offset(page * limit)
        .limit(limit)
        .orderBy(orderTable[order].col, orderTable[order].dir);
      res.json(products);
    } else {
      products = await Product.query()
        .offset(page * limit)
        .limit(limit)
        .orderBy(orderTable[order].col, orderTable[order].dir);
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", [isId], async (req, res, next) => {
  handleValidationError(req, res, next);

  const { id } = req.params;
  try {
    const product = await Product.query().findById(id);
    if (!product) {
      res.status(404);
      res.json({ message: "product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

router.get(
  "/search/:slug",
  [param("slug", "invalid slug").isAlphanumeric()],
  async (req, res, next) => {
    handleValidationError(req, res, next);
    const { slug } = req.params;
    const { isAdmin } = req.body;

    try {
      let products;
      if (isAdmin) {
        products = await Product.query()
          .where("name", "like", `%${slug}%`)
          .limit(100)
          .orderBy("name", "asc");
      } else {
        products = await Product.query()
          .where("deleted", false)
          .andWhere("name", "like", `%${slug}%`)
          .limit(100)
          .orderBy("name", "asc");
      }

      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  fileUpload.single("image"),
  productValidation,
  async (req, res, next) => {
    if (handleValidationError(req, res, next)) return null;
    throwErrorIf(res, !req.file, "no image supplied", 401);
    const {
      name,
      price,
      quantity,
      description,
      producerId,
      categoryId,
    } = req.body;

    try {
      const wasCreated = await Product.query().insert({
        name,
        price: +price,
        quantity: +quantity,
        description,
        image_url: "static/images/products/" + req.file.filename,
        producer_id: +producerId,
        category_id: +categoryId,
      });
      console.log(wasCreated);
      res.status(201);
      return res.json({ message: "created succesfuly!" });
    } catch (error) {
      return next(error);
    }
  }
);
router.patch(
  "/",
  fileUpload.single("image"),
  productValidation,
  async (req, res, next) => {
    console.log(req.file);
    if (handleValidationError(req, res, next)) return null;

    const {
      id,
      name,
      price,
      quantity,
      description,
      producerId,
      categoryId,
    } = req.body;

    try {
      const prod = {
        name,
        price: +price,
        quantity: +quantity,
        description,
        producer_id: +producerId,
        category_id: +categoryId,
      };

      if (req.file)
        prod.image_url = "static/images/products/" + req.file.filename;

      console.log(prod);

      const wasEdited = await Product.query()
        .findById(id)
        .patch({ ...prod });

      console.log(wasEdited);

      res.status(200);
      return res.json({ message: "was edited!" });
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/invalidate/:id",
  [isId, body("invalidate").isBoolean()],
  async (req, res, next) => {
    if (handleValidationError(req, res, next)) return null;

    const { id } = req.params;
    const { invalidate } = req.body;

    try {
      await Product.query().findById(id).patch({
        deleted: invalidate,
      });

      return res.json({
        message: invalidate ? "was invalidated" : "was uninvalidated",
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete("/:id", [isId], async (req, res, next) => {
  handleValidationError(req, res, next);
  const { id } = req.params;
  try {
    const wasDeleted = await Product.query().deleteById(id);
    console.log(id, wasDeleted);
    return res.json({ message: "deleted succesfuly!" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
