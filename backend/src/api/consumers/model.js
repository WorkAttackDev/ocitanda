const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class Consumer extends Model {
	static get tableName() {
		return tableNames.consumer;
	}

	static get jsonSchema() {
		return schema;
	}

	static get relationMappings() {
		// eslint-disable-next-line global-require
		const User = require('../users/model');
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: `${tableNames.consumer}.user_id`,
					to: `${tableNames.user}.id`,
				},
			},
		};
	}
}

module.exports = Consumer;
