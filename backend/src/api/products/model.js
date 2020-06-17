const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class Product extends Model {
	static get tableName() {
		return tableNames.product;
	}

	static get jsonSchema() {
    return schema;
  }
}

module.exports = Product;
