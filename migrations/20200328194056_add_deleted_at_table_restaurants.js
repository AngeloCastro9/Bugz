
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('restaurants', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('restaurants', table => {
        table.dropColumn('deletedAt')
    })
};
