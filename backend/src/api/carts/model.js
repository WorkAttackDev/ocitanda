const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');
const { producer } = require('../../constants/tableNames');

class Cart extends Model {
	static get tableName() {
		return tableNames.cart_item;
	}
	static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
	// eslint-disable-next-line global-require
	const Product = require('../products/model');
	return {
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.cart_item}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
	};
}
}

module.exports = Cart;
