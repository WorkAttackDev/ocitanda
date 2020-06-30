const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class Subscriber extends Model {
	static get tableName() {
		return tableNames.subscriber;
	}
	static get jsonSchema() {
    return schema;
  }
}

module.exports = Subscriber;
