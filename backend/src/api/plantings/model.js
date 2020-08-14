const { Model } = require("objection");
const tableNames = require("../../constants/tableNames");
const schema = require("./schema.json");

class Planting extends Model {
  static get tableName() {
    return tableNames.planting;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Planting;
