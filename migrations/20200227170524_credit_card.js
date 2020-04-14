
exports.up = function(knex, Promise) {
    return knex.schema.createTable('credit_card', table => {
        table.increments('id').primary()
        table.string('cardType').notNull()
        table.string('nameOnCard').notNull()
        table.string('cardNumber').notNull()
        table.integer('securityCode').notNull()
        table.integer('expMonth').notNull()
        table.integer('expYear').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('credit_card')  
};
