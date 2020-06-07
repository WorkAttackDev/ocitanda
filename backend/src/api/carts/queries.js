const db = require("../../db");
const tableNames = require("../../constants/tableNames");

const getByUserId = async (userId) => {
	const cartItems = await db(tableNames.cart_item)
		.where({ consumer_id: userId })
		.innerJoin(tableNames.product, "product_id", `${tableNames.product}.id`)
		.select(
			"count",
			"consumer_id",
			"product_id",
			"quantity",
			"producer_id",
			"price",
			"name",
			"image_url",
			"description",
			"category_id",
			`${tableNames.cart_item}.id`
		);
	return cartItems;
};

module.exports = {
	getByUserId,
};
