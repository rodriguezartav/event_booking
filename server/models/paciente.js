var errors = require('throw.js');

exports.list = function(knex){
  var result = {};
  var pacienteMap = {};

  return knex.table("paciente")
  .select("*")
  .then( function(res){
    result.pacientes = res;
    res.forEach(function(p){
      p.pagos = [];
      p.reservacion = {};
      p.emails = [];
      pacienteMap[p.id] = p;
    })
    return knex.table("reservacion")
    .select("*")
  })
  .then( function(res){
    result.reservaciones = res;
    res.forEach(function(r){
      pacienteMap[r.paciente_id].reservacion = r;
    })
    return knex.table("pago")
    .select("*")
  })
  .then( function(res){
    result.pagos = res || [];
    res.forEach(function(r){
      pacienteMap[r.paciente_id].pagos.push(r);
    });
    return knex.table("email")
    .select("*")
  })
  .then( function(res){
    res.forEach(function(r){
      pacienteMap[r.paciente_id].emails.push(r);
    });
    result.email = res;
    var total = 0;
    var jueves = 0;
    var sabado = 0;
    var domingo = 0;
    var monto = 0;
    var pago = 0;
    var saldo = 0;
    result.reservaciones.forEach(function(r){
      total += r.monto;
      jueves+=r.jueves;
      sabado+=r.sabado;
      domingo+=r.domingo;
      r.saldo += r.saldo;
    })
    result.pagos.forEach(function(p){
      pago += p.monto;
    })
    result.stats = {
      total: total,
      jueves: jueves,
      domingo: domingo,
      saldo: saldo,
      pago: pago
    }
    return result;
  })
}

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
      body.reservacion.saldo = body.reservacion.monto;
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
