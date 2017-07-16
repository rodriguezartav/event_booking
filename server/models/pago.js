var errors = require('throw.js');
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var sqs = new AWS.SQS();
var Promise = require("bluebird");

var sns = new AWS.SNS();


exports.create = function(knex,pago){
  var reservacion;
  return knex.table("pago")
  .returning('*')
  .insert( pago )
  .then(function(pagoRes){
    pago = pagoRes[0];
    return knex.table("reservacion")
    .update({saldo: knex.raw('saldo - ' + pago.monto ) })
    .where({id: pago.reservacion_id})
    .returning("*")
  }).then(function(reservaciones){
    reservacion = reservaciones[0];
    return QueueMessage({email:"pago",paciente_id: reservacion.paciente_id});
  })
  .then(function(reservaciones){
    return [pago,reservacion];
  })
}

exports.update = function(knex, id,pago){
  return knex.table("pago")
  .update(pago)
  .where({id: id})
  .returning('*')
}

exports.destroy = function(knex, id){
  var customer_id;
  return knex.table("pago")
  .delete()
  .where({id: id})
}

function QueueMessage(event){
  var params = {
    MessageBody: JSON.stringify(event), /* required */
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/246741407701/emailbulk.fifo', /* required */
    DelaySeconds: 0,
    MessageDeduplicationId: Math.random() + 'a',
    MessageGroupId: 'GROUP1'
  };

  var promise = function(resolve, reject){
    sqs.sendMessage(params, function(err, res){
       if(err) reject(err);
       else resolve(res);
     });
  }
  return new Promise(promise);
}
