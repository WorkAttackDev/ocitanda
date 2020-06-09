const router = require('express').Router();
const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const { handleValidationError } = require('../validations');
const { sign } = require('../util');

const User = require('../users/model');

const loginValidation = [
	body('email', 'Incorrect email').isString().isEmail(),
	body('password', 'Incorrect password').isString().isLength({ min: 8 }),
];

const signupValidation = [
	...loginValidation,
	body('name').isString().notEmpty(),
	body('phone').isString().isLength({ min: 9, max: 9 }).isNumeric(),
	body('image_url').isString().not().isEmpty(),
];

const throwErrorIf = (res, condition, errorMsg, status = 500) => {
	if (condition) {
		const error = new Error(errorMsg);
		res.status(status);
		throw error;
	}
};

router.post('/signup', signupValidation, async (req, res, next) => {
	handleValidationError(req, res, next);

	try {
		const existUser = await User.query()
			.where({ email: req.body.email })
			.first();

		throwErrorIf(res, existUser, 'user Already exists', 403);

		const hashedPassword = await bcrypt.hash(req.body.password, 12);

		const insertedUser = await User.query().insert({
			...req.body,
			password: hashedPassword,
		});

		delete insertedUser.password;

		const token = await sign({
			id: insertedUser.id,
			name: insertedUser.name,
			email: insertedUser.email,
		});

		res.json({ user: insertedUser, token });
	} catch (error) {
		next(error);
	}
});

router.post('/login', loginValidation, async (req, res, next) => {
	handleValidationError(req, res, next);
	const { email, password } = req.body;
	try {
		const user = await User.query().where({ email }).first();

		throwErrorIf(res, !user, 'user does not exists', 403);

		const isValidPassword = await bcrypt.compare(password, user.password);

		throwErrorIf(res, !isValidPassword, 'invalid password', 403);

		delete user.password;

		const token = await sign({
			id: user.id,
			name: user.name,
			email: user.email,
		});

		res.json({ user, token });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
