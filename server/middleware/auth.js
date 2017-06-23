var errors = require('throw.js');

module.exports = function(req, res, next){
  if( !req.headers["authorization"] ){
    return res.status(401).json({"message": "All API Calls must include authorization Code in the header"});
  }
  req.knex('user_table').where({ access_code: req.headers["authorization"] }).select(['id','customer_id'])
  .then( function(result){
    if(result.length == 0 ) return res.status(401).json( {"message": "User Access Code is not valid"} );
    req.params.customer_id = result[0].customer_id;
    req.params.user_id = result[0].id;
    next();
    return true;
  })
  .catch( function(err){
    return res.status(401).json(err);
  })
}
