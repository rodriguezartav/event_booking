var errors = require('throw.js');
var express = require('express');
var router = express.Router();
var reservacion = require('../models/reservacion');
var auth = require("../middleware/auth");
var admin = require("../middleware/admin");

router.get("/getStat",function(req,res,next){
  reservacion.getStat(req.knex)
  .then( function(result){
     res.status(200).json(result)
   })
  .catch( function(err){
    if(err.statusCode) next(err);
    else next( new errors.InternalServerError(err) )
  })
})

router.post('/', admin, function(req,res,next){
  reservacion.update(req.knex, req.body )
  .then( function(result){
     res.status(200).json(result[0])
   })
   .catch( function(err){
     if(err.statusCode) next(err);
     else next( new errors.InternalServerError(err) )
    })
});

router.delete('/:id', admin ,function(req,res,next){
  reservacion.delete( req.knex,req.params.id )
  .then( function(){
     res.status(200).json({})
   })
   .catch( function(err){
     if(err.statusCode) next(err);
     else next( new errors.InternalServerError(err) )
    })
});






module.exports = router;
