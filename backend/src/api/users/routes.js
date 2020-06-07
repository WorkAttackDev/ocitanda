const router = require('express').Router();

const tableNames = require('../../constants/tableNames');
const { findAll, getById } = require('../globalQueries');

router.get('/', async (req, res) => {
	const users = await findAll(tableNames.user);
	res.json(users);
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const user = await getById(id, tableNames.user);
	try {
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			const error = new Error('Invalid ID');
			res.status(422);
			throw error;
		} else {
			if (user) return res.json(user);
			return next();
		}
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
