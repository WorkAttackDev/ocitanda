const db = require('../../db');
const tableNames = require('../../constants/tableNames');

const Product = (
	name = '',
	price = 0,
	quantity = 0,
	description = '',
	image_url = '',
	producer_id = -1,
	category_id = -1
) => ({
	name,
	price,
	quantity,
	description,
	image_url,
	producer_id,
	category_id,
});

const createProduct = async (product = Product()) =>
	db(tableNames.product).insert(product);

const updateProduct = async (id = -1, product = Product()) =>
	db(tableNames.product).update(product).where('id', '=', id);

const deleteProduct = async (id = -1) =>
	db(tableNames.product).delete().where('id', '=', id);

module.exports = {
	createProduct,
	updateProduct,
	deleteProduct,
	Product,
};
