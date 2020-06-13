const router = require("express").Router();

const tableNames = require("../../constants/tableNames");
const { findAll } = require("../globalQueries");
const { getByUserId } = require("./queries");
const { isAuth } = require("../../middleware");

router.get("/", isAuth, async (req, res) => {
  const cartItem = await findAll(tableNames.cart_item);
  res.json(cartItem);
});

router.get("/:userId", isAuth, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cartItems = await getByUserId(userId);
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
