var errors = require('throw.js');
var express = require('express');
var router = express.Router();
var paciente = require('../models/paciente');
var auth = require("../middleware/auth");
var admin = require("../middleware/admin");


router.post('/', function(req,res,next){
  var operation;
  if( req.body.id ){
    var pacienteObj = {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      id: req.body.id
    }
    operation = paciente.update(req.knex, pacienteObj);
  }
  else operation = paciente.create(req.knex, req.body )

  operation
  .then( function(result){
     res.status(200).json(result)
   })
   .catch( function(err){
    console.log(err.constraint)
    if(err.constraint && err.constraint=="paciente_email_unique") return next( new errors.Conflict("email"))
    if(err.constraint && err.constraint=="paciente_telefono_unique") return next( new errors.Conflict("celular"))
    else if(err.statusCode) next(err);
    else next( new errors.InternalServerError(err) )
    })
});


router.get('/list', admin ,function(req,res,next){
  paciente.list( req.knex)
  .then( function(result){
     res.status(200).json(result)
   })
   .catch( function(err){
     if(err.statusCode) next(err);
     else next( new errors.InternalServerError(err) )
    })
});



module.exports = router;
