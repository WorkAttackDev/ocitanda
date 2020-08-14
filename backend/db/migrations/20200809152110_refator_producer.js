// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");
const { addDefaultColumns, references } = require("../utils");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  // await knex.schema.dropTable(tableNames.producer);

  // await knex.schema.table(tableNames.producer, (table) => {
  //   table.string("name", 50).notNullable();
  // });

  await knex.schema.createTable(tableNames.planting, (table) => {
    table.increments().notNullable();
    table.string("name").notNullable();
    table.date("start").notNullable();
    table.date("end").notNullable();
    references(table, tableNames.producer)
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.producer);
  await knex.schema.createTable(tableNames.producer, (table) => {
    table.increments().notNullable();
    table.string("name", 50).notNullable();
    references(table, tableNames.user);
    addDefaultColumns(table);
  });
  await knex.schema.dropTable(tableNames.planting);
};
