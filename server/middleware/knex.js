var kf = require("../../knexfile");
var knex = require('knex')(kf[ process.env["NODE_ENV"] || process.env["N_ENV"] || "development"]);

knex.batchUpdate = function(table,records,updateFields){
  var sqls = [];
  records.forEach( function(record){
    var sql = knex.table(table).insert(record).toString();
    var addOn = [ ' ON CONFLICT (id) DO UPDATE SET'];
    updateFields.forEach( function(fieldName){
      var parts = [fieldName, "=", "EXCLUDED", ".", fieldName];
      if( addOn.length != 1 ) addOn.push(",");
      addOn.push( parts.join("") );
    })
    addOn.push('returning *;');
    sqls.push( sql + addOn.join(" ") );
  });
  return knex.raw( sqls.join(" ") )
}


module.exports = function(req, res, next){
  req.knex = knex;
  next();
}
