const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");
const schema = require("./schema.json");

class PurchaseLocation extends Model {
  static get tableName() {
    return tableNames.purchase_location;
  }

  static get jsonSchema() {
    return schema;
  }

//   static get relationMappings() {
//     // eslint-disable-next-line global-require
//     const Product = require("../products/model");
//     return {
//       product: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: Product,
//         join: {
//           from: `${tableNames.purchase_location}.product_id`,
//           to: `${tableNames.product}.id`,
//         },
//       },
//     };
//   }
}

module.exports = PurchaseLocation;
