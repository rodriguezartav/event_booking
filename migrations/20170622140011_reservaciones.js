
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reservacion', function (table) {
    table.increments();

    table.integer('paciente_id').unsigned();
    table.foreign('paciente_id').references('paciente.id');
    table.integer('jueves').default(0);
    table.integer('sabado').default(0);
    table.integer('domingo').default(0);
    table.decimal('monto',17,2);
    table.decimal('saldo',17,2);
    table.integer('total_personas');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reservacion', function (table) {})

};
