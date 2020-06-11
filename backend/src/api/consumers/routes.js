const router = require("express").Router();
const { isId, handleValidationError } = require("../validations");
const { isAuth } = require("../../middleware");
const Consumer = require("./model");
const User = require("../users/model");

const userAllowedColumns = [
	"id",
	"email",
	"name",
	"phone",
	"last_login",
	"image_url",
	"created_at",
	"updated_at",
	"deleted_at",
];

router.get("/", async (req, res, next) => {
	try {
		const consumers = await Consumer.query()
			.select("id", "birth_date", "gender")
			.withGraphFetched("user")
			.modifyGraph("user", (builder) => {
				builder.select(...userAllowedColumns);
			});

		res.json(consumers);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", isAuth, [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		const consumer = await Consumer.query()
			.select("id", "birth_date")
			.findById(id)
			.withGraphFetched("user")
			.modifyGraph("user", (builder) => {
				builder.select(...userAllowedColumns);
			})
			.first();

		if (!consumer) {
			res.status(404);
			res.json({});
		} else {
			res.json(consumer);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", isAuth, [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		const consumer = await Consumer.query().findById(id);
		if (!consumer) {
			res.status(404);
			res.json({ message: "user not found" });
		} else {
			await User.query().deleteById(consumer.user_id);
			res.json({ message: "deleted successfuly" });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
