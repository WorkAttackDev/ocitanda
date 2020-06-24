const router = require("express").Router();
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const { handleValidationError, isId } = require("../validations");
const { sign, throwErrorIf } = require("../util");
const { format } = require("fecha");
const { sendEmail } = require("../email");

const User = require("../users/model");
const Consumer = require("../consumers/model");
const { isAuth } = require("../../middleware");

const loginValidation = [
	body("email", "Incorrect email").isString().isEmail(),
	body("password", "Incorrect password").isString().isLength({ min: 8 }),
];

const signupValidation = [
	...loginValidation,
	body("name").isString().notEmpty().trim(),
	body("phone").isString().isLength({ min: 9, max: 9 }).isNumeric(),
	body("imageUrl").isString().not().isEmpty(),
	body("gender").isString().not().isEmpty().isLength({ max: 1 }),
	body("birthDate").not().isEmpty().toDate(),
];

const updateValidation = [
	body("id", "Incorrect id").isInt(),
	body("email", "Incorrect email").isString().isEmail(),
	body("name").isString().notEmpty().trim(),
	body("phone").isString().isLength({ min: 9, max: 9 }).isNumeric(),
	body("imageUrl").isString().not().isEmpty(),
	body("gender").isString().not().isEmpty().isLength({ max: 1 }),
	body("birthDate").not().isEmpty().toDate(),
];

router.post("/signup", signupValidation, async (req, res, next) => {
	handleValidationError(req, res, next);
	const { name, email, birthDate, imageUrl, gender, phone } = req.body;
	const trx = await Consumer.startTransaction();

	try {
		const existUser = await User.query()
			.where({ email: email.toLowerCase() })
			.first();

		throwErrorIf(res, existUser, "user Already exists", 403);

		const hashedPassword = await bcrypt.hash(req.body.password, 12);

		const consumer = await Consumer.query(trx).insertGraph({
			birth_date: format(birthDate, "YYYY-MM-DD HH:mm:ss"),
			gender,

			user: {
				name,
				email: email.toLowerCase(),
				phone,
				image_url: imageUrl,
				password: hashedPassword,
			},
		});

		await trx.commit();

		delete consumer.user.password;
		delete consumer.user.reset_password_token;
		delete consumer.user.reset_password_expires_date;

		const token = await sign({
			userId: consumer.id,
			name: consumer.user.name,
			email: consumer.user.email,
		});

		res.status(201);
		res.json({ consumer, token });

		const info = await sendEmail(consumer.user.email);
	} catch (error) {
		await trx.rollback();
		next(error);
	}
});

router.post("/login", loginValidation, async (req, res, next) => {
	handleValidationError(req, res, next);
	const { email, password } = req.body;
	try {
		const user = await User.query()
			.where({ email: email.toLowerCase() })
			.first();

		throwErrorIf(res, !user, "user does not exists", 404);

		const isValidPassword = await bcrypt.compare(password, user.password);

		throwErrorIf(res, !isValidPassword, "invalid password", 401);

		const consumer = await Consumer.query()
			.where({ user_id: user.id })
			.withGraphFetched("user")
			.first();

		delete consumer.user.password;
		delete consumer.user.reset_password_token;
		delete consumer.user.reset_password_expires_date;

		const token = await sign({
			userId: consumer.id,
			name: consumer.user.name,
			email: consumer.user.email,
		});

		res.status(200);
		res.json({ consumer, token });
	} catch (error) {
		next(error);
	}
});

router.put("/update", updateValidation, async (req, res, next) => {
	console.log(req.body);
	handleValidationError(req, res, next);
	const { id, name, email, birthDate, imageUrl, gender, phone } = req.body;
	const trx = await Consumer.startTransaction();

	try {
		const existUser = await Consumer.query(trx).findById(id).first();

		throwErrorIf(res, !existUser, "user don't exists", 404);

		await User.query(trx).findById(existUser.user_id).patch({
			name,
			email: email.toLowerCase(),
			phone,
			image_url: imageUrl,
		});

		await Consumer.query(trx)
			.findById(id)
			.patch({
				birth_date: format(birthDate, "YYYY-MM-DD HH:mm:ss"),
				gender,
			});

		const consumer = await Consumer.query(trx)
			.findById(id)
			.withGraphFetched("user")
			.first();

		await trx.commit();

		delete consumer.user.password;
		delete consumer.user.reset_password_token;
		delete consumer.user.reset_password_expires_date;

		const token = await sign({
			userId: consumer.id,
			name: consumer.user.name,
			email: consumer.user.email,
		});

		res.status(200);
		res.json({ consumer, token });
		// const info = await sendEmail(consumer.user.email);
		// console.log(info, consumer.user.email);
	} catch (error) {
		await trx.rollback();
		next(error);
	}
});

module.exports = router;
