
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description').notNull()
        table.double('price').notNull()
        table.integer('restaurantId').references('id')
            .inTable('users').notNull()
        table.boolean('vegan').notNull().defaultTo(false)
        table.integer('rate').defaultTo(0)
        table.integer('numberOfVotes').defaultTo(0)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products')  
};
