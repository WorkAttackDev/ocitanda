const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");
const schema = require("./schema.json");

class Producer extends Model {
  static get tableName() {
    return tableNames.producer;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Planting = require("../plantings/model");
    return {
      plantings: {
        relation: Model.HasManyRelation,
        modelClass: Planting,
        join: {
          from: `${tableNames.producer}.id`,
          to: `${tableNames.planting}.producer_id`,
        },
      },
    };
  }
}

module.exports = Producer;
