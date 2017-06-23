var errors = require('throw.js');

exports.create = function(knex,body){
  return knex.transaction( function(trx){
    return knex.table("paciente")
    .select("*")
    .where({email: body.paciente.email})
    .then( function(results){
      if( results.length > 0 ){
       return [results[0].id];
      }
      else{
        body.paciente.es_nuevo = true;
        return knex.table("paciente")
        .returning('id')
        .transacting(trx)
        .insert( body.paciente )
      }
    })
    .then(function(result){
      body.paciente.id = result[0]
      body.reservacion.paciente_id = result[0];
      return knex.table("reservacion")
      .returning('id')
      .transacting(trx)
      .insert( body.reservacion );
    })
    .then(function(result){
      body.reservacion.id = result[0];
      return body;
    })
  })
}

exports.update = function(knex, id,report){
  return knex.table("paciente")
  .update(report)
  .where({id: id})
  .returning('*')
}

exports.destroy = function(knex, id){
  var customer_id;
  return knex.table("paciente")
  .delete()
  .where({id: id})
}
