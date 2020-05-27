
exports.up = function (knex, Promise) {
    return knex.schema.createTable('restaurants', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('description')
        table.string('street').notNull()
        table.integer('number').notNull()
        table.string('neighborhood').notNull()
        table.string('cnpj').notNull().unique()
        table.string('password').notNull()
        table.boolean('vegan').notNull().defaultTo(false)
        table.string('urlImage').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurants')
};
