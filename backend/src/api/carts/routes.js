const router = require("express").Router();

const tableNames = require("../../constants/tableNames");
const { findAll } = require("../globalQueries");
const { isAuth } = require("../../middleware");
const Cart = require("./model");

router.use(isAuth);

router.get("/", async (req, res) => {
  const cartItem = await findAll(tableNames.cart_item);
  res.json(cartItem);
});

router.get("/:consumerId", async (req, res, next) => {
  const { consumerId } = req.params;
  try {
    const cartItems = await Cart.query().where({consumer_id: consumerId}).withGraphFetched("product");
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
