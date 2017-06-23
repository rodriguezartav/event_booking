
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pago', function (table) {
    table.increments();

    table.integer('reservacion_id').unsigned();
    table.foreign('reservacion_id').references('reservacion.id');

    table.date('fecha');
    table.decimal('monto',17,2);
    table.string('detalles');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pago', function (table) {})
};
