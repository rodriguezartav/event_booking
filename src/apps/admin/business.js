var Ajax = require("../../helpers/ajax");

function Business(app){
  var _this = this;
  this.app = app;
  this.user = {access_code: true};
  this.app.state={
    user: this.user,
    users: [{username: "roberto+dev@rodcocr.com", password: "1"},{username: "carolinadada@hotmail.com", password: "colibri"}],
    view: "login",
    pacientes: [],
    stats: {}
  };
  Business.this = this;
  setTimeout(function(){_this.onLogin("roberto+dev@rodcocr.com","1")},400);
}

Business.prototype.onLogin = function(email,password){
  var _this = Business.this;
  _this.app.state.users.forEach( function(user){
    if( user.username == email && user.password == password ){
      _this.app.setState({user: user, view: "home"})
      _this.getAll();
    }
  })
}

Business.prototype.getAll = function(email,password){
  var _this = this;

  Ajax.get( this,"/pacientes/list")
  .then( function(response){
    return response.json()
  })
  .then( function(json){
    console.log(json)
    _this.app.setState({pacientes: json.pacientes, stats: json.stats});
  })


}

module.exports = Business;
