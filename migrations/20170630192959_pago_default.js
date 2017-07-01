
exports.up = function(knex, Promise) {
return knex.schema.alterTable('pago', function (table) {

    table.timestamp('created').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
};
