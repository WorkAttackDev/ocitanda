const { param, validationResult } = require('express-validator');

const isId = param('id', 'This field must be a Integer').isInt({ min: 1 });

const handleValidationError = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const err = new Error('Validation Error');
		res.status(422);
		err.errorStack = errors.array();
		next(err);
		throw err;
	}
};

module.exports = {
	isId,
	handleValidationError,
};
