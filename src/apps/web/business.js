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
    email: null,
    celular: null,
    error: null,
    saving: false
  };
  Business.this = this;
}

Business.prototype.onChangeDia = function(refs){
  var dias = [];

  if(refs["jueves"].checked) dias.push("jueves");
  if(refs["sabado"].checked) dias.push("sabado");
  if(refs["domingo"].checked) dias.push("domingo");
  var state = this.app.state
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
  if(!this.isEmailValid()) return;
  if(!this.isCelularValid()) return;
  if(!this.isPersonasValid()) return;
  if(!this.isDiasValid()) return;
  this.app.setState({error: null, saving: true})

  var body = {
    "paciente":{
      "nombre": state.nombre,
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
    return response.json();
  })
  .then( function(json){
    console.log(json);
    if(json.paciente) _this.app.setState({view: "complete",saving: false});
    else if(json.message == "email") _this.app.setState({saving: false, error: "Ya existe una reservacion con ese email! Contacte a carolinadada@hotmail.com" });
    else if(json.message == "celular") _this.app.setState({saving: false, error: "Ya existe una reservacion con este telefono, si no tiene telefono use su numero de pasaporte; o Contacte a carolinadada@hotmail.com" });
  })
  .catch( function(e){
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

Business.prototype.getAll = function(email,password){
  var _this = this;
  return ;
  Ajax.get( this,"/accounts")
  .then( function(response){
    return response.json()
  })
  .then( function(json){
    var accounts = json.accounts;
    var accountMap = {};
    accounts.forEach( function(account){
      if(account.substract_on_debit == "true") account.substract_on_debit = true;
      else account.substract_on_debit = false;

      if(account.substract_on_credit == "true") account.substract_on_credit = true;
      else account.substract_on_credit = false;

      accountMap[account.id] = account;
    })
    _this.app.setState({accountMap: accountMap, accounts: accounts, appView: "list", pendingSave: false});
    return Ajax.get( _this,"/journals/listDrafts")
  })
  .then( function(response){
    return response.json()
  })
  .then( function(json){
    var journals = json.journals;
    _this.processJournals(journals);
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

  if( !this.app.state.nombre || this.app.state.nombre.length < 3){
    this.app.setState({error: "Falto ingresar su nombre y apellido completo"})
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
