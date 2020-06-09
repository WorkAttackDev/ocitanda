const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class Category extends Model {
	static get tableName() {
		return tableNames.category;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = Category;
