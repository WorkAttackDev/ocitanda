const { Model } = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./schema.json');

class Purchase extends Model {
	static get tableName() {
		return tableNames.purchase;
	}
	static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const PurchaseProducts = require("../purchase-products/model");
    const PurchaseLocation = require("../purchase-locations/model");
    const Consumer = require("../consumers/model");
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: PurchaseProducts,
        join: {
          from: `${tableNames.purchase_products}.purchase_id`,
          to: `${tableNames.purchase}.id`,
        },
      },
      location: {
        relation: Model.HasOneRelation,
        modelClass: PurchaseLocation,
        join: {
          from: `${tableNames.purchase}.id`,
          to: `${tableNames.purchase_location}.purchase_id`,
        },
      },
      consumer: {
        relation: Model.HasOneRelation,
        modelClass: Consumer,
        join: {
          from: `${tableNames.consumer}.id`,
          to: `${tableNames.purchase}.consumer_id`,
        },
      },
    };
  }
}

module.exports = Purchase;
