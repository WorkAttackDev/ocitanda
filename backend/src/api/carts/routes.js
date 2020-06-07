const router = require("express").Router();

const tableNames = require("../../constants/tableNames");
const { findAll } = require("../globalQueries");
const { getByUserId } = require("./queries");

router.get("/", async (req, res) => {
	const cartItem = await findAll(tableNames.cart_item);
	res.json(cartItem);
});

router.get("/:userId", async (req, res, next) => {
	const { userId } = req.params;
	const cartItems = await getByUserId(userId);
	try {
		res.json(cartItems);
		return next();
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
