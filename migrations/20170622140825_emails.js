
exports.up = function(knex, Promise) {
  return knex.schema.createTable('email', function (table) {
    table.increments();

    table.integer('paciente_id').unsigned();
    table.foreign('paciente_id').references('paciente.id');
    table.string('nombre');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('email', function (table) {})
};
