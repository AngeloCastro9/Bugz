
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('endereco').notNull()
        table.string('cpf').notNull().unique()
        table.string('cnpj').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.boolean('vegan').notNull().defaultTo(false)
        table.boolean('isRestaurant').notNull().defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
