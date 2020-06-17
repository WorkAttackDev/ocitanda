const router = require("express").Router();
const { body, query } = require("express-validator");

const { handleValidationError, isId } = require("../validations");
const Product = require("./model");

const productValidation = [
  body(["name", "description"]).isString().not().isEmpty(),
  body("price").isNumeric(),
  body("imageUrl").isString(),
  body(["producerId", "categoryId", "quantity"]).isInt({ min: 1 }),
];

const buildProductByReqBody = (req) =>
  Product(
    req.body.name,
    req.body.price,
    req.body.quantity,
    req.body.description,
    req.body.imageUrl,
    req.body.producerId,
    req.body.categoryId
  );

//* routes

router.get("/", async (req, res, next) => {
  const limit =
    !isNaN(req.query.limit) && req.query.limit > 2 ? req.query.limit : 10;
  const page =
    !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;

  try {
    const products = await Product.query()
      .offset(page * limit)
      .limit(limit);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", [isId], async (req, res, next) => {
  if (handleValidationError(req, next)) return null;

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

// router.post("/", productValidation, async (req, res, next) => {
//   if (handleValidationError(req, next)) return null;
//   const newProduct = buildProductByReqBody(req);

//   try {
//     const wasCreated = await createProduct(newProduct);
//     console.log(wasCreated);
//     res.status(201);
//     return res.json({ message: "created succesfuly!" });
//   } catch (error) {
//     return next(error);
//   }
// });

// router.post("/:id", [...productValidation, isId], async (req, res, next) => {
//   if (handleValidationError(req, next)) return null;

//   const { id } = req.params;
//   const newProduct = buildProductByReqBody(req);

//   try {
//     const wasUpdated = await updateProduct(id, newProduct);
//     console.log(id, wasUpdated);
//     return res.json({ message: "updated succesfuly!" });
//   } catch (error) {
//     return next(error);
//   }
// });

// router.delete("/:id", [isId], async (req, res, next) => {
//   handleValidationError(req, res, next);
//   const { id } = req.params;
//   try {
//     const wasDeleted = await deleteProduct(id);
//     console.log(id, wasDeleted);
//     return res.json({ message: "deleted succesfuly!" });
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
