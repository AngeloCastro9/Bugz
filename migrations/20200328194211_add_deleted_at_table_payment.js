
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('payment', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('payment', table => {
        table.dropColumn('deletedAt')
    })
};
