const router = require("express").Router();
const { body } = require("express-validator");
const { handleValidationError, isId } = require("../validations");
const { format } = require("fecha");
const uniqid = require("uniqid");

const Purchase = require("./model");
const PurchaseProducts = require("../purchase-products/model");
const {
  confirmPurchaseEmail,
  PurchaseEmail,
  deliveredPurchaseEmail,
} = require("../email");
const MESSAGES = require("../../constants/messages");

const validatePurchase = [
  body(["delivered", "paid"]).isBoolean(),
  body(["quantity", "consumer_id", "consumer_location_id"]).isInt({ allow_leading_zeroes: false }),
  body(["purchase_date"]).notEmpty().isString(),
  body("products").isArray({ min: 1 }),
];

router.get("/", async (req, res, next) => {
  try {
    const purchases = await Purchase.query()
      .withGraphFetched("products")
      .modifyGraph("products", (builder) => {
        builder.withGraphFetched("product");
      })
      .withGraphFetched("consumer")
      .modifyGraph("consumer", (builder) => {
        builder.withGraphFetched("user").modifyGraph("user", (bd) => {
          bd.select("email", "name", "phone");
        });
      });
    res.json({ message: MESSAGES.DONE, value: purchases });
  } catch (error) {
    next(error);
  }
});

router.get("/consumer/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const purchases = await Purchase.query()
      .where({ consumer_id: id })
      .withGraphFetched("products")
      .modifyGraph("products", (builder) => {
        builder.withGraphFetched("product");
      });
    res.json({ message: MESSAGES.DONE, value: purchases });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.query()
      .findById(id)
      .withGraphFetched("products");
    res.json({ message: MESSAGES.DONE, value: purchase });
  } catch (error) {
    return next(error);
  }
});

router.post("/", validatePurchase, async (req, res, next) => {
  if (handleValidationError(req, res, next)) return null;
  const {
    paid,
    delivered,
    quantity,
    consumer_id,
    products,
    purchase_date,
    purchase_method,
    consumer_location_id
  } = req.body;

  const newPurchase = {
    paid,
    delivered,
    quantity,
    consumer_id,
    purchase_method,
    consumer_location_id,
    purchase_date: format(new Date(purchase_date), "YYYY-MM-DD HH:mm:ss"),
    code: uniqid("OC-"),
  };

  const trx = await Purchase.startTransaction();
  try {
    const purchase = await Purchase.query(trx)
      .insertAndFetch(newPurchase)
      .withGraphFetched("products")
      .modifyGraph("products", (builder) => {
        builder.withGraphFetched("product");
      })
      .withGraphFetched("consumer")
      .modifyGraph("consumer", (builder) => {
        builder.withGraphFetched("user").modifyGraph("user", (bd) => {
          bd.select("email", "name", "phone");
        });
      });

    const productsWithId = products.map((_p) => ({
      ..._p,
      purchase_id: purchase.id,
    }));

    const results = [];

    for (let i = 0; i < productsWithId.length; i++) {
      const p = await PurchaseProducts.query(trx).insert(productsWithId[i]);
      results.push(p);
    }

    // await PurchaseEmail({ to: purchase.consumer.user.email, purchase });

    process.env.NODE_ENV !== undefined && (await trx.commit());

    res.json({ message: MESSAGES.CREATED, value: purchase });
  } catch (error) {
    await trx.rollback();
    next(error);
  }
});

router.patch("/pay/:id", [body("paid").isBoolean()], async (req, res, next) => {
  const { id } = req.params;
  const { paid } = req.body;

  const trx = await Purchase.startTransaction();

  try {
    const purchase = await Purchase.query(trx)
      .findById(id)
      .patchAndFetchById(id, { paid })
      .withGraphFetched("consumer")
      .modifyGraph("consumer", (builder) => {
        builder.withGraphFetched("user").modifyGraph("user", (bd) => {
          bd.select("email", "name", "phone");
        });
      });

    if (paid === true)
      await confirmPurchaseEmail({
        to: purchase.consumer.user.email,
        purchase,
      });

    trx.commit();
    res.json({ message: MESSAGES.UPDATED, value: purchase });
  } catch (error) {
    trx.rollback();
    next(error);
  }
});

router.patch(
  "/deliver/:id",
  [body("delivered").isBoolean()],
  async (req, res, next) => {
    const { id } = req.params;
    const { delivered } = req.body;

    const trx = await Purchase.startTransaction();

    try {
      const purchase = await Purchase.query(trx)
        .findById(id)
        .patchAndFetchById(id, { delivered })
        .withGraphFetched("consumer")
        .modifyGraph("consumer", (builder) => {
          builder.withGraphFetched("user").modifyGraph("user", (bd) => {
            bd.select("email", "name", "phone");
          });
        });

      if (delivered === true)
        await deliveredPurchaseEmail({
          to: purchase.consumer.user.email,
          purchase,
        });
      trx.commit();
      res.json({ message: MESSAGES.UPDATED, purchase });
    } catch (error) {
      trx.rollback();
      next(error);
    }
  }
);

module.exports = router;
