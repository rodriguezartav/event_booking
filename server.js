var port = process.env.PORT || 3000;
var express = require('express');
process.env.BABEL_ENV = 'server';


var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
const pg = require('pg');
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

var knex = require("./server/middleware/knex");
var reservaciones = require("./server/routes/reservaciones");
var pacientes = require("./server/routes/pacientes");
var pagos = require("./server/routes/pagos");

app.use(cors());
app.use( bodyParser.json() );
app.use( knex );
app.use( "/reservaciones", reservaciones );
app.use( "/pacientes", pacientes );
app.use( "/pagos", pagos );

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('dist'))

app.use((err, req, res, next) => {
  console.log(err)
  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') delete err.stack;
  res.status(err.statusCode || 500).json(err);
});

app.listen(port);

module.exports = app;

Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};
