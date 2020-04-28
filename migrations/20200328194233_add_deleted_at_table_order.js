
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('order', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('order', table => {
        table.dropColumn('deletedAt')
    })
};
