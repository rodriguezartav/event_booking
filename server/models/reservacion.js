var errors = require('throw.js');

exports.create = function(knex,reservacion){
  return knex.table("reservacion")
  .returning('*')
  .insert( reservacion );
}

exports.update = function(knex,reservacion){
  return knex.table("reservacion")
  .select("*")
  .where({id: reservacion.id})
  .then( function(result){
    var resTest = result[0];
    if(resTest.saldo != resTest.monto && reservacion.monto != resTest.monto) throw new errors.Conflict("El saldo ya fue modificado por un pago, no se puede cambiar el monto");
    return knex.table("reservacion")
    .update(reservacion)
    .where({id: reservacion.id})
    .returning('*')
  })
}

exports.destroy = function(knex, id){
  var customer_id;

  return knex.table("reservacion")
  .delete()
  .where({id: id})
}
