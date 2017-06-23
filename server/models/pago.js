var errors = require('throw.js');

exports.create = function(knex,report){
  return knex.table("pago")
  .returning('*')
  .insert( report );
}

exports.update = function(knex, id,report){
  return knex.table("pago")
  .update(report)
  .where({id: id})
  .returning('*')
}

exports.destroy = function(knex, id){
  var customer_id;
  return knex.table("pago")
  .delete()
  .where({id: id})
}
