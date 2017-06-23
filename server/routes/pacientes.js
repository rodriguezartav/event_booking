var errors = require('throw.js');
var express = require('express');
var router = express.Router();
var paciente = require('../models/paciente');
var auth = require("../middleware/auth");
var admin = require("../middleware/admin");


router.post('/', function(req,res,next){
  paciente.create(req.knex, req.body )
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

router.put('/:id', admin ,function(req,res,next){
  paciente.update( req.knex,req.params.id,req.body )
  .then( function(result){
     res.status(200).json({paciente:result[0]})
   })
   .catch( function(err){
     if(err.statusCode) next(err);
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
