/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.
        createTable('brand', (table) => {
            table.increments('bid').primary();
            table.string('bname', 255).notNullable().unique();
            table.timestamps(true, true);
        }).
        createTable('product', (table) => {
            table.increments('id').primary();
            table.string('pname', 255).notNullable().unique();
            table.integer('bid', 255).unsigned().notNullable();
            table.foreign('bid').references('bid').inTable('brand');
            table.text('description');
            table.decimal('price', 10, 2).notNullable();
            table.string('pimage', 255).notNullable();
            table.timestamps(true, true);
        }).
        createTable('user', (table) => {
            table.increments('id').primary();
            table.string('username', 255).notNullable().unique();
            table.string('password', 255).notNullable();
            table.timestamps(true, true);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('product').dropTable('brand').dropTable('user');
};
