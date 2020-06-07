const db = require("../db");

const findAll = (tableName) => db(tableName);

const getById = async (id, tableName) => {
	const [value] = await db(tableName).where("id", "=", id);
	return value;
};

module.exports = {
	findAll,
	getById,
};
