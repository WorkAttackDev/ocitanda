const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');
const {
	createProduct,
	Product,
	updateProduct,
	deleteProduct,
} = require('./queries');

const productValidation = [
	body(['name', 'description']).isString().not().isEmpty(),
	body('price').isNumeric(),
	body('imageUrl').isString(),
	body(['producerId', 'categoryId', 'quantity']).isInt({ min: 1 }),
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

const handleValidationError = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const err = new Error('Product Validation Error');
		err.statusCode = 422;
		err.errorStack = errors.array();
		next(err);
	}
	return false;
};

//* routes

router.get('/', async (req, res, next) => {
	try {
		const products = await findAll(tableNames.product);
		res.json(products);
	} catch (err) {
		next(err);
	}
});

router.get(
	'/:id',
	[param('id', 'This field must be a Integer').isInt({ min: 1 })],
	async (req, res, next) => {
		if (handleValidationError(req, res, next)) return null;

		const { id } = req.params;
		try {
			const product = await getById(id, tableNames.product);
			if (product) return res.json(product);
			return next();
		} catch (error) {
			next(error);
		}
	}
);

router.post('/', productValidation, async (req, res, next) => {
	if (handleValidationError(req, res, next)) return null;
	const newProduct = buildProductByReqBody(req);

	try {
		const wasCreated = await createProduct(newProduct);
		console.log(wasCreated);
		res.status(201);
		return res.json({ message: 'created succesfuly!' });
	} catch (error) {
		next(error);
	}
});

router.post(
	'/:id',
	[
		...productValidation,
		param('id', 'This field must be a Integer').isInt({ min: 1 }),
	],
	async (req, res, next) => {
		if (handleValidationError(req, res, next)) return null;

		const { id } = req.params;
		const newProduct = buildProductByReqBody(req);

		try {
			const wasUpdated = await updateProduct(id, newProduct);
			console.log(id, wasUpdated);
			return res.json({ message: 'updated succesfuly!' });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	[param('id', 'This field must be a Integer').isInt({ min: 1 })],
	async (req, res, next) => {
		if (handleValidationError(req, res, next)) return null;
		const { id } = req.params;
		try {
			const wasDeleted = await deleteProduct(id);
			console.log(id, wasDeleted);
			return res.json({ message: 'deleted succesfuly!' });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
