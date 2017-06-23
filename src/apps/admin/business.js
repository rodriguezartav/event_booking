var Ajax = require("../../helpers/ajax");

function Business(app){
  var _this = this;
  this.app = app;
  this.app.state={
    user: null,
    users: [{username: "roberto+dev@rodcocr.com", password: "1"},{username: "carolinadada@hotmail.com", password: "colibri"}],
    view: "login"
  };
  Business.this = this;
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

module.exports = Business;
