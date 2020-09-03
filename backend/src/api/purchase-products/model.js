const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class PurchaseProducts extends Model {
	static get tableName() {
		return tableNames.purchase_products;
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
				from: `${tableNames.purchase_products}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
	};
}

}

module.exports = PurchaseProducts;
