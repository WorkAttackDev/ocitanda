// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table) {
	table.timestamps(false, true);
	table.datetime('deleted_at');
}

function references(table, foringTable, column = 'id') {
	table
		.integer(`${foringTable}_${column}`)
		.unsigned()
		.references(column)
		.inTable(foringTable)
		.onDelete('cascade');
}

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
	Promise.all([
		await knex.schema.createTable(tableNames.user, (table) => {
			table.increments().notNullable();
			table.string('email', 254).notNullable().unique();
			table.string('name').notNullable();
			table.string('password', 127).notNullable();
			table.datetime('last_login');
			table.string('phone', 9).notNullable();
			table.string('image_url', 200);
			addDefaultColumns(table);
		}),
		await knex.schema.createTable(tableNames.province, (table) => {
			table.increments().notNullable();
			table.string('name', 50).notNullable().unique();
			addDefaultColumns(table);
		}),
		await knex.schema.createTable(tableNames.category, (table) => {
			table.increments().notNullable();
			table.string('name', 50).notNullable().unique();
			addDefaultColumns(table);
		}),
	]);

	await knex.schema.createTable(tableNames.address, (table) => {
		table.increments().notNullable();
		table.string('location', 60).notNullable();
		references(table, tableNames.province);
		references(table, tableNames.user);
	});

	await knex.schema.createTable(tableNames.consumer, (table) => {
		table.increments().notNullable();
		table.dateTime('birth_date').notNullable();
		references(table, tableNames.user);
	});

	await knex.schema.createTable(tableNames.producer, (table) => {
		table.increments().notNullable();
		table.string('owner', 50).notNullable();
		references(table, tableNames.user);
	});

	await knex.schema.createTable(tableNames.product, (table) => {
		table.increments().notNullable();
		table.string('name', 70).notNullable();
		table.float('price', 2).notNullable();
		table.integer('quantity').notNullable();
		table.string('description', 200).notNullable();
		table.string('image_url', 200).notNullable();
		references(table, tableNames.consumer);
		references(table, tableNames.producer);
		references(table, tableNames.category);
	});

	await knex.schema.createTable(tableNames.purchase, (table) => {
		table.increments().notNullable();
		table.date('purchase_date').notNullable();
		references(table, tableNames.consumer);
		references(table, tableNames.product);
	});
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
	await Promise.all(
		[
			tableNames.purchase,
			tableNames.product,
			tableNames.consumer,
			tableNames.producer,
			tableNames.address,
			tableNames.user,
			tableNames.category,
			tableNames.province,
		].map((tableName) => knex.schema.dropTable(tableName))
	);
};
