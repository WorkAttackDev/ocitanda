const router = require('express').Router();

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');

router.get('/', async (req, res) => {
	const producers = await findAll(tableNames.producer);
	res.json(producers);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const producer = await getById(id, tableNames.producer);
	try {
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} else {
			if (producer) return res.json(producer);
			return next();
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
