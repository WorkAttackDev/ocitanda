const router = require('express').Router();

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');

router.get('/', async (req, res) => {
	const provinces = await findAll(tableNames.province);
	res.json(provinces);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const province = await getById(id, tableNames.province);
	try {
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} else {
			if (province) return res.json(province);
			return next();
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
