
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('products', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('products', table => {
        table.dropColumn('deletedAt')
    })
};
