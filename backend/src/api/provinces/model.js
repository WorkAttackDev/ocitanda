const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class Province extends Model {
	static get tableName() {
		return tableNames.province;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = Province;
