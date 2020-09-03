const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");
const { addDefaultColumns, references } = require("../utils");

/**
 * @param {Knex} knex
 */

exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.purchase, (table) => {
    table.increments().notNullable();
    table.dateTime("purchase_date").notNullable();
    table.integer("quantity").notNullable();
    table.string("code", 40).notNullable();
    table.boolean("paid").notNullable().defaultTo(false);
    table.boolean("delivered").notNullable().defaultTo(false);
    references(table, tableNames.consumer);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.purchase_products, (table) => {
    table.increments().notNullable();
    table.integer("count").notNullable();
    references(table, tableNames.purchase);
    references(table, tableNames.product);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.purchase_location, (table) => {
    table.increments().notNullable();
    table.string("neighborhood").notNullable();
    table.string("street").notNullable();
    table.string("house").notNullable();
    table.string("details").notNullable();
    table.string("extra_phone");
    references(table, tableNames.purchase);
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */

exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.purchase_location);
  await knex.schema.dropTable(tableNames.purchase_products);
  await knex.schema.dropTable(tableNames.purchase);
};
