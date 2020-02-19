
exports.up = function(knex, Promise) {
    return knex.schema.createTable('restaurants', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('endereco').notNull()
        table.string('cnpj').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('vegan').notNull().defaultTo(false)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('restaurants')
};
