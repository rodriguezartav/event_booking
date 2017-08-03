var Ajax = require("../../helpers/ajax");


function Business(app){
  var _this = this;
  this.app = app;
  this.app.state={
    view: "home",
    personas: 0,
    dias: [],
    monto: 0,
    nombre: null,
    apellido: null,
    email: null,
    celular: null,
    error: null,
    saving: false,
    stats:{
      jueves:0,
      sabado: 0,
      domingo:0
    }
  };
  Business.this = this;
  this.getAll();
}

Business.prototype.getAll = function(email,password){
  var _this = this;
  Ajax.get( this,"/reservaciones/getStat")
  .then( function(response){
    return response.json()
  })
  .then( function(json){
    _this.app.setState({stats: json});
    console.log(json)
  })
  .catch( function(err){
    _this.app.setState({error: "Occurio un error cargando los pacientes, vuelva a cargar. Si continuan los problemas escriba a roberto@3vot.com. " + JSON.stringify(err)})
  })
}

Business.prototype.onChangeDia = function(refs){
  var _this = this;
  var dias = [];
  var stats = this.app.state.stats;
  var state = this.app.state
  state.error = null;

  function checkStat(dia){
    if( stats[dia] > 45 ){
      state.error= `El ${dia} ya llego a su capacidad maxima, favor escoja otro dia.`;
      return false;
    }
    return true;
  }

  if(refs["jueves"].checked && checkStat("jueves")) dias.push("jueves");
  if(refs["sabado"].checked && checkStat("sabado")) dias.push("sabado");
  if(refs["domingo"].checked && checkStat("domingo")) dias.push("domingo");
  state.dias= dias;
  this.updateMonto(state);
}

Business.prototype.onChangePersonas = function(personas){
  console.log(personas)
  var state = this.app.state;
  state.personas = personas;
  this.updateMonto(state);
}

Business.prototype.onSave = function(){
  var _this = this;
  var state = this.app.state;
  if(!this.isNameValid()) return;
  if(!this.isApellidoValid()) return;
  if(!this.isEmailValid()) return;
  if(!this.isCelularValid()) return;
  if(!this.isPersonasValid()) return;
  if(!this.isDiasValid()) return;
  this.app.setState({error: null, saving: true})

  var body = {
    "paciente":{
      "nombre": state.nombre + ' ' + state.apellido,
      "email": state.email,
      "telefono":state.celular,
    },
    "reservacion":{
      "jueves": state.dias.indexOf("jueves") > -1 ? state.personas : 0,
      "sabado": state.dias.indexOf("sabado") > -1 ? state.personas : 0,
      "domingo": state.dias.indexOf("domingo") > -1 ? state.personas : 0,
      "monto":state.monto,
      "saldo": state.monto,
      "total_personas": state.personas
    }
  }
  Ajax.post(this,"/pacientes",body)
  .then( function(response){
    if(response.status==403) _this.app.setState({saving: false, error: "Ya existe una reservacion con ese email! Contacte a carolinadada@hotmail.com" });
    else if(response.status==409) _this.app.setState({saving: false, error: "Ya existe una reservacion con este telefono, si no tiene telefono use su numero de pasaporte; o Contacte a carolinadada@hotmail.com" });
    else if( !response.ok ) _this.app.setState({saving: false, error: "Ocurrio un error de conexion, favor intente de nuevo o contacte a roberto@3vot.com" });
    return response.json();
  })
  .then( function(json){
    if(!json) return true;
    if(!json.message) _this.app.setState({view: "complete",saving: false});
  })
  .catch( function(e){
    _this.app.setState({saving: false, error: "Ocurrio un error de conexion, favor intente de nuevo o contacte a roberto@3vot.com" });
    console.log(e);
  })
}

Business.prototype.onChangeText = function(type,value){
  this.app.state[type] = value;
  this.app.setState(this.app.state);
}

Business.prototype.updateMonto = function(state){
  var dias = state.dias.length;
  var personas = state.personas;
  var valorUnitario = 0;
  if( dias == 1 ) valorUnitario = 150;
  else if( dias == 2 ) valorUnitario = 350;
  else if( dias == 3 ) valorUnitario = 500;
  state.monto = valorUnitario * state.personas;
  this.app.setState( state )
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



Business.prototype.isEmailValid = function(){
  if(!this.app.state.email || this.app.state.email.length < 4 || this.app.state.email.indexOf("@") < 2 || this.app.state.email.indexOf(".") < 3){
    this.app.setState({error: "Error, el email parece no ser valido"})
    return false;
  }
  return true;
}

Business.prototype.isCelularValid = function(){
  var isNumber = function(str) {
    var pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
  }
  if( !this.app.state.celular || !isNumber(this.app.state.celular) ){
    this.app.setState({error: "Error, el celular solo puede tener numeros"})
    return false;
  }
  return true;
}

Business.prototype.isNameValid = function(){

  if( !this.app.state.nombre || this.app.state.apellido == "" || this.app.state.nombre.length < 3){
    this.app.setState({error: "Falto ingresar su nombre"})
    return false;
  }
  return true;
}

Business.prototype.isApellidoValid = function(){

  if( !this.app.state.apellido || this.app.state.apellido == "" || this.app.state.apellido.length < 3){
    this.app.setState({error: "Falto ingresar su apellido"})
    return false;
  }
  return true;
}

Business.prototype.isDiasValid = function(){
  if(this.app.state.dias.length < 1){
    this.app.setState({error: "Escoja un al menos un dia"})
    return false;
  }
  return true;
}

Business.prototype.isPersonasValid = function(){
  if(!this.app.state.personas|| this.app.state.personas < 1){
    this.app.setState({error: "Debe escoger cuantas personas van en esta reservacion"})
    return false;
  }
  return true;
  return true;
}

function replaceAll(target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
}

module.exports = Business;
