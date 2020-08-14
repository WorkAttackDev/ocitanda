function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.boolean("deleted").defaultTo(false);
}

function references(table, foringTable, column = "id") {
  return table
    .integer(`${foringTable}_${column}`)
    .unsigned()
    .references(column)
    .inTable(foringTable)
    .notNullable();
}

module.exports = {
    references,
    addDefaultColumns
}
