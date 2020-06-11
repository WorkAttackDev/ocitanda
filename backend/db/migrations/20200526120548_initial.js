// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");
const orderedTables = require("../../src/constants/orderedTables");

function addDefaultColumns(table) {
	table.timestamps(false, true);
	table.datetime("deleted_at");
}

function references(table, foringTable, column = "id") {
	table
		.integer(`${foringTable}_${column}`)
		.unsigned()
		.references(column)
		.inTable(foringTable)
		.onDelete("cascade")
		.notNullable();
}

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	Promise.all([
		await knex.schema.createTable(tableNames.user, (table) => {
			table.increments().notNullable();
			table.string("email", 254).notNullable().unique();
			table.string("name", 200).notNullable();
			table.string("password", 200).notNullable();
			table.datetime("last_login");
			table.string("phone", 9).notNullable();
			table.string("image_url", 200);
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
	});

	await knex.schema.createTable(tableNames.consumer, (table) => {
		table.increments().notNullable();
		table.dateTime("birth_date").notNullable();
		table.enu("gender", ["M", "F", "O"]).notNullable();
		references(table, tableNames.user);
	});

	await knex.schema.createTable(tableNames.producer, (table) => {
		table.increments().notNullable();
		table.string("owner", 50).notNullable();
		references(table, tableNames.user);
	});

	await knex.schema.createTable(tableNames.product, (table) => {
		table.increments().notNullable();
		table.string("name").notNullable();
		table.float("price").notNullable();
		table.integer("quantity").notNullable();
		table.string("description", 300).notNullable();
		table.string("image_url", 200).notNullable();
		references(table, tableNames.producer);
		references(table, tableNames.category);
	});

	await knex.schema.createTable(tableNames.purchase, (table) => {
		table.increments().notNullable();
		table.date("purchase_date").notNullable();
		table.integer("quantity").notNullable();
		references(table, tableNames.consumer);
		references(table, tableNames.product);
	});

	await knex.schema.createTable(tableNames.cart_item, (table) => {
		table.increments().notNullable();
		table.integer("count").notNullable();
		references(table, tableNames.consumer);
		references(table, tableNames.product);
	});
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
	await Promise.all(
		orderedTables.map((tableName) => knex.schema.dropTable(tableName))
	);
};
