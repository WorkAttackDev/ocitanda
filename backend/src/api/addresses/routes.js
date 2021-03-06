const router = require('express').Router();

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');

router.get('/', async (req, res) => {
	const addresses = await findAll(tableNames.address);
	res.json(addresses);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const address = await getById(id, tableNames.address);
	try {
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} else {
			if (address) return res.json(address);
			return next();
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
