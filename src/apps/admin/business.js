var Ajax = require("../../helpers/ajax");

function Business(app){
  var _this = this;
  this.app = app;
  var user = localStorage.getItem('user');
  if(user) _this.user = JSON.parse(user);
  this.app.state={
    users: [{username: "roberto@rodcocr.com", password: "monomono"},{username: "carolinadada@hotmail.com", password: "colibri"}],
    view: this.user ? "home" : "login",
    pacientes: [],
    stats: {}
  };
  Business.this = this;
  if(this.user) this.getAll();
  //setTimeout(function(){_this.onLogin("roberto+dev@rodcocr.com","1")},400);
}

Business.prototype.onLogin = function(email,password){
  var _this = Business.this;
  _this.app.state.users.forEach( function(user){
    if( user.username == email && user.password == password ){
      _this.user = {email: email, password: password, access_code: true};
      localStorage.setItem("user",JSON.stringify(_this.user));
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
