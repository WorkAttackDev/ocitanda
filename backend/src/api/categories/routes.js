const router = require('express').Router();

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');

router.get('/', async (req, res) => {
	const categories = await findAll(tableNames.category);
	res.json(categories);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const category = await getById(id, tableNames.category);
	try {
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} else {
			if (category) return res.json(category);
			return next();
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
