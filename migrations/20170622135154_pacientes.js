
exports.up = function(knex, Promise) {
return knex.schema.createTable('paciente', function (table) {
    table.increments();
    table.string('nombre');
    table.string('email').unique();
    table.boolean('es_nuevo');
    table.boolean('es_valido');
    table.string('telefono').unique();
    table.string('access_code');
    table.timestamp('created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('paciente', function () {
  })

};
