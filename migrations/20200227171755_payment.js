
exports.up = function(knex, Promise) {
    return knex.schema.createTable('payment', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.date('paymentDate').notNull()
        table.double('Amount').notNull()
        table.string('paymentType').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('payment')  
};
