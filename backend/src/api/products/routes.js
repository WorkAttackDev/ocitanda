const router = require('express').Router();
const { body } = require('express-validator');

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');
const { handleValidationError, isId } = require('../validations');
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

//* routes

router.get('/', async (req, res, next) => {
	try {
		const products = await findAll(tableNames.product);
		res.json(products);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', [isId], async (req, res, next) => {
	if (handleValidationError(req, next)) return null;

	const { id } = req.params;
	try {
		const product = await getById(id, tableNames.product);
		if (product) return res.json(product);
		return next();
	} catch (error) {
		return next(error);
	}
});

router.post('/', productValidation, async (req, res, next) => {
	if (handleValidationError(req, next)) return null;
	const newProduct = buildProductByReqBody(req);

	try {
		const wasCreated = await createProduct(newProduct);
		console.log(wasCreated);
		res.status(201);
		return res.json({ message: 'created succesfuly!' });
	} catch (error) {
		return next(error);
	}
});

router.post('/:id', [...productValidation, isId], async (req, res, next) => {
	if (handleValidationError(req, next)) return null;

	const { id } = req.params;
	const newProduct = buildProductByReqBody(req);

	try {
		const wasUpdated = await updateProduct(id, newProduct);
		console.log(id, wasUpdated);
		return res.json({ message: 'updated succesfuly!' });
	} catch (error) {
		return next(error);
	}
});

router.delete('/:id', [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		const wasDeleted = await deleteProduct(id);
		console.log(id, wasDeleted);
		return res.json({ message: 'deleted succesfuly!' });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
