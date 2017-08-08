
exports.up = function(knex, Promise) {
return knex.schema.alterTable('reservacion', function (table) {
    table.boolean('sin_hotel');
  })
};

exports.down = function(knex, Promise) {
};

