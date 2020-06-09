const router = require('express').Router();

// const tableNames = require('../../constants/tableNames');
// const { findAll, getById } = require('../globalQueries');
const User = require('./model');

router.get('/', async (req, res, next) => {
	try {
		const users = await User.query().select();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.query().select().where('id', id).first();

		if (!user) {
			res.status(404);
			res.json({});
		} else {
			res.json(user);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
