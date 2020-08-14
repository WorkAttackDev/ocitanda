// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");
const orderedTables = require("../../src/constants/orderedTables");
const {addDefaultColumns, references} = require("../utils");



/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  Promise.all([
    await knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("google_id", 100).unique();
      table.boolean("verified").defaultTo(false);
      table.string("name", 200).notNullable();
      table.string("password", 200).defaultTo("google");
      table.string("phone", 9);
      table.string("image_url", 200).notNullable();
      table.string("reset_password_token");
      table.bigInteger("reset_password_expires_date");
      addDefaultColumns(table);
    }),
    await knex.schema.createTable(tableNames.province, (table) => {
      table.increments().notNullable();
      table.string("name", 50).notNullable().unique();
      addDefaultColumns(table);
    }),
    await knex.schema.createTable(tableNames.category, (table) => {
      table.increments().notNullable();
      table.string("name", 50).notNullable().unique();
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable();
    table.string("location", 60).notNullable();
    references(table, tableNames.province);
    references(table, tableNames.user);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.consumer, (table) => {
    table.increments().notNullable();
    table.dateTime("birth_date");
    table.enu("gender", ["M", "F", "O"]).defaultTo("O");
    table.boolean("isAdmin").defaultTo(false);
    references(table, tableNames.user);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.producer, (table) => {
    table.increments().notNullable();
    table.string("name", 50).notNullable();
    // references(table, tableNames.user);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.product, (table) => {
    table.increments().notNullable();
    table.string("name").notNullable().unique();
    table.float("price").notNullable();
    table.integer("quantity").notNullable();
    table.string("description", 300).notNullable();
    table.string("image_url", 200).notNullable();
    table.enum("unity", ["unidade", "kg"]).defaultTo("kg");
    references(table, tableNames.producer);
    references(table, tableNames.category);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.purchase, (table) => {
    table.increments().notNullable();
    table.date("purchase_date").notNullable();
    table.integer("quantity").notNullable();
    references(table, tableNames.consumer);
    references(table, tableNames.product);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.cart_item, (table) => {
    table.increments().notNullable();
    references(table, tableNames.consumer);
    references(table, tableNames.product);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.subscriber, (table) => {
    table.increments().notNullable();
    table.string("email", 254).notNullable().unique();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.api, (table) => {
    table.increments().notNullable();
    table.string("key", 254).notNullable().unique();
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await orderedTables.reduce(async (promise, tableName) => {
    await promise;
    return knex.schema.dropTable(tableName);
  }, Promise.resolve());
};
