const router = require('express').Router();

const { handleValidationError, isId } = require('../validations');
const Province = require('./model');

router.get('/', async (req, res, next) => {
	try {
		const provinces = await Province.query().select();
		res.json(provinces);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		const province = await Province.query()
			.select()
			.where('id', id)
			.first();

		if (!province) {
			res.status(404);
			res.json({});
		} else {
			res.json(province);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
