var React = require('react');
var reactDOM = require('react-dom/server');
var App = require('../src/apps/web/container.jsx');
var Stats = require("../stats.json");

var ReactServer = function(title){
  const name = "Hi dani";
  this.initialState = { name };
  this.body = reactDOM.renderToString(<App {...this.initialState} />);
  this.title = "Demo"
  var sampleName = Stats.assetsByChunkName.app[0];
  var parts = sampleName.split(".")
  this.hash = parts[1];
}

ReactServer.prototype.generateHtml = function( ){
  var _this = this;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${JSON.stringify(_this.initialState)}</script>
        <title>${_this.title}</title>
        <link rel="stylesheet" href="/assets/app.${this.hash}.css" />
      </head>

      <body>
        <div id="root">${_this.body}</div>
      <script src="/assets/app.${this.hash}.js"></script>

      </body>

    </html>
  `;
};


module.exports = ReactServer;
