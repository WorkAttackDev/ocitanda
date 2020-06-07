const router = require('express').Router();

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');

router.get('/', async (req, res) => {
	const consumers = await findAll(tableNames.consumer);
	res.json(consumers);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const consumer = await getById(id, tableNames.consumer);
	try {
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} else {
			if (consumer) return res.json(consumer);
			return next();
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
