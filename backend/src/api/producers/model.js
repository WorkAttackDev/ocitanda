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
    const User = require("../users/model");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${tableNames.producer}.user_id`,
          to: `${tableNames.user}.id`,
        },
      },
    };
  }
}

module.exports = Producer;
