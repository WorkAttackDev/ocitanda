const router = require("express").Router();

const { body } = require("express-validator");
const { handleValidationError, isId } = require("../validations");
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
		const cartItems = await Cart.query()
			.where({ consumer_id: consumerId })
			.withGraphFetched("product");
		res.json(cartItems);
	} catch (error) {
		next(error);
	}
});

router.post(
	"/",
	[body("consumerId").isInt({ min: 1 }), body("productId").isInt({ min: 1 })],
	async (req, res, next) => {
		handleValidationError(req, res, next);
		const { consumerId, productId } = req.body;
		try {
			const exists = await Cart.query()
				.where({
					consumer_id: consumerId,
					product_id: productId,
				})
				.first();

			if (exists) {
				throw new Error("already on cart");
			} else {
				const cartItems = await Cart.query().insert({
					consumer_id: consumerId,
					product_id: productId,
				});
				res.status(201);
				res.json({ message: "successful added", cartId: cartItems.id });
			}
		} catch (error) {
			next(error);
		}
	}
);

router.delete("/:id", [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		await Cart.query().deleteById(id);
		res.status(200);
		res.json({ message: "Deleted" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
