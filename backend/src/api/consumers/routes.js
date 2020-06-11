const router = require('express').Router();

const { isId, handleValidationError } = require('../validations');
const Consumer = require('./model');

const userAllowedColumns = [
	'id',
	'email',
	'name',
	'phone',
	'last_login',
	'image_url',
	'created_at',
	'updated_at',
	'deleted_at',
];

router.get('/', async (req, res, next) => {
	try {
		const consumers = await Consumer.query()
			.select('id', 'birth_date', 'gender')
			.withGraphFetched('user')
			.modifyGraph('user', (builder) => {
				builder.select(...userAllowedColumns);
			});

		res.json(consumers);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', [isId], async (req, res, next) => {
	handleValidationError(req, res, next);
	const { id } = req.params;
	try {
		const consumer = await Consumer.query()
			.select('id', 'birth_date')
			.findById(id)
			.withGraphFetched('user')
			.modifyGraph('user', (builder) => {
				builder.select(...userAllowedColumns);
			})
			.first();
		if (!consumer) {
			res.status(404);
			res.json({});
		} else {
			res.json(consumer);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
