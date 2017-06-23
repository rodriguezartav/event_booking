var errors = require('throw.js');
var express = require('express');
var router = express.Router();
var reservacion = require('../models/reservacion');
var auth = require("../middleware/auth");
var admin = require("../middleware/admin");


router.post('/', auth, function(req,res,next){
  reservacion.create(req.knex, req.body )
  .then( function(result){
     res.status(200).json({reservacion:result[0]})
   })
   .catch( function(err){
     if(err.statusCode) next(err);
     else next( new errors.InternalServerError(err) )
    })
});
router.put('/:id', admin ,function(req,res,next){
  reservacion.update( req.knex,req.params.id,req.body )
  .then( function(result){
     res.status(200).json({reservacion:result[0]})
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
