
exports.up = function(knex, Promise) {
    return knex.schema.createTable('order', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('productId').references('id')
            .inTable('products').notNull()
        table.integer('restaurantId').references('id')
            .inTable('restaurants').notNull()
        table.integer('paymentId').references('id')
            .inTable('payment').notNull()
        table.integer('quantity').notNull()
        table.double('unitPrice').notNull()
        table.date('orderDate').notNull()
        table.date('pickupDate')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('order')  
};
