var Ajax = require("../../helpers/ajax");

function Business(app){
  var _this = this;
  this.app = app;
  var user = localStorage.getItem('user');
  if(user) _this.user = JSON.parse(user);
  this.app.state={
    users: [{username: "segleau@yahoo.com", password: "cusingas"},{username: "roberto@rodcocr.com", password: "monomono"},{username: "carolinadada@hotmail.com", password: "colibri"}],
    view: this.user ? "list" : "login",
    pacientes: [],
    paciente: null,
    stats: {},
    pendingSave: false
  };
  Business.business = this;
  if(this.user) this.getAll();
  //setTimeout(function(){_this.onLogin("roberto+dev@rodcocr.com","1")},400);
}

Business.business = null;

Business.prototype.onLogin = function(email,password){
  var _this = Business.business;
  _this.app.state.users.forEach( function(user){
    if( user.username == email && user.password == password ){
      _this.user = {email: email, password: password, access_code: "abcdef"};
      localStorage.setItem("user",JSON.stringify(_this.user));
      window.location.reload(true);
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
    if(json.message) _this.app.setState({error: "Occurio un error cargando los pacientes, vuelva a cargar. Si continuan los problemas escriba a roberto@3vot.com. " + json.message})
    if(json) _this.app.setState({pacientes: json.pacientes, stats: json.stats});
  })
  .catch( function(err){
    _this.app.setState({error: "Occurio un error cargando los pacientes, vuelva a cargar. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)})
  })
}

Business.prototype.onShowList = function(){
  this.app.setState({view: "list"});
}

Business.prototype.onShowPagoCreate = function(){
  this.app.setState({view: "pago"});
}

Business.prototype.onSelectPaciente = function(paciente){
  this.app.setState({view: "detail", paciente: paciente});
}

Business.prototype.onSendBillingEmail = function(){
}

Business.prototype.saveReservacion = function(reservacion){

  this.app.setState({pendingSave: true,error: null});
  var _this = this;
  Ajax.post( this,"/reservaciones",reservacion)
  .then( function(response){
    if(response.status == 409){
      _this.app.setState({error: "El saldo ya fue modificado, no se puede cambiar el monto", pendingSave: false})
      return null;
    }
    return response.json()
  })
  .then( function(json){
    if(json && json.message) _this.app.setState({error: "Ocurrio un error sin identificar. " + json.message, pendingSave: false})
    else if(json){
      var paciente = _this.app.state.paciente;
      paciente.reservacion = json;
      console.log(json)
      _this.app.setState({paciente: paciente, pendingSave: false});
    }
  })
  .catch( function(err){
    console.log(err);
    _this.app.setState({error: "Occurio un error. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)})
  })
}

Business.prototype.savePaciente = function(paciente){
  this.app.setState({pendingSave: true,error:null});
  var _this = this;
  Ajax.post( this,"/pacientes",paciente)
  .then( function(response){
    if(response.status == 409) _this.app.setState({error: "El email ya esta registrado con otro paciente", pendingSave: false})
    return response.json()
  })
  .then( function(json){
    if(json.message) _this.app.setState({error: "Ocurrio un error sin identificar. " + json.message, pendingSave: false})
    else if(json) _this.app.setState({paciente: paciente, pendingSave: false});
  })
  .catch( function(err){
    console.log(err);
    _this.app.setState({error: "Occurio un error. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)})
  })
}

Business.prototype.createPago = function(monto, detalles){
  this.app.setState({pendingSave: true,error:null});
  var _this = this;
  var pago = {reservacion_id: this.app.state.paciente.reservacion.id, monto: monto, detalles: detalles};
  Ajax.post( this,"/pagos",pago)
  .then( function(response){
    return response.json()
  })
  .then( function(json){
    if(json.message) _this.app.setState({error: "Ocurrio un error sin identificar. " + json.message, pendingSave: false})
    else if(json){
      var paciente = _this.app.state.paciente;
      if(!paciente.pagos) paciente.pagos = [];
      pago = json.pago;
      paciente.pagos.push(pago);
      paciente.reservacion = json.reservacion;
      if(!paciente.update) paciente.update = 0;
      paciente.update++;
      _this.app.setState({paciente:paciente, pendingSave:false,error:null});
    }
  })
  .catch( function(err){
    console.log(err);
    _this.app.setState({error: "Occurio un error. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)})
  })
}



module.exports = Business;
