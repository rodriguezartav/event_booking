
exports.up = function(knex, Promise) {
return knex.schema.alterTable('email', function (table) {

    table.timestamp('created').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
};
