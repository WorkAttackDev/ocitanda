const router = require('express').Router();

const { handleValidationError, isId } = require('../validations');

const Category = require('./model');

router.get('/', async (req, res, next) => {
	try {
		const categories = await Category.query();
		res.json(categories);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		const category = await Category.query()
			.select()
			.where('id', id)
			.first();

		if (!category) {
			res.status(404);
			res.json({});
		} else {
			res.json(category);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
