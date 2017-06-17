var port = process.env.PORT || 3000;
var express = require('express');
process.env.BABEL_ENV = 'server';

require('babel-core/register')({
  presets: ['es2015', 'react'],
  "env": {
    "server": {
     "plugins": [
      [
        "css-modules-transform", {
          "generateScopedName": "[hash:8]",
          "extensions": [".css"]
        }
      ]]
    }
  }
});


var app = express();
var ReactServer = require("./serverReact.js");

app.get("/", function(req,res){
  var reactServer = new ReactServer();
    res.send(reactServer.generateHtml());
})

app.use(express.static('dist'))

app.use((err, req, res, next) => {
  console.log(err)
  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') delete err.stack;
  res.status(err.statusCode || 500).json(err);
});

app.listen(port);

module.exports = app;
