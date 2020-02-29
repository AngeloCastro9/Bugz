
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('description')
        table.string('street').notNull()
        table.integer('number').notNull()
        table.string('neighborhood').notNull()
        table.string('cpf_cnpj').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.boolean('vegan').notNull().defaultTo(false)
        table.boolean('is_restaurant').notNull().defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
