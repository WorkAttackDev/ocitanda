const router = require("express").Router();
const { body } = require("express-validator");
const { handleValidationError, isId } = require('../validations');

const PurchaseProducts = require("./model");

const MESSAGES = {
	UPDATED: "UPDATED",
	CREATED: "CREATED",
	DELETED: "DELETED",
	DONE: "DONE",
}
module.exports = router;
