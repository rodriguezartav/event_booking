var React         = require("react");
var Business = require("../business");

var Confirmados =  React.createClass({

  getInitialState: function(){
    return {
      celular: ""
    }
  },

  onChangeCelular: function(){
    var celular = this.refs.txt_celular.value;
    this.setState({ celular: celular });
  },


  onSearch: function(){
    var celular = this.refs.txt_celular.value;
    celular = replaceAll(celular, "-","");
    celular = replaceAll(celular," ","");

    var firstNumber = celular.substring(0,1);
    var lastNumber = celular.substring(4);
    celular = firstNumber + "x-xx-" + lastNumber;
    this.setState({ celular: celular });
  },

  getForDay: function(dias, day){
    var itemForDay;
    if( dias[day].length == 0 ) return null;
    else{
      var item = dias[day].pop()
      var color = "rgba(250,0,20,0.8)";
      if(item.depositado > 0) color= "#dfdfdf";
      if( item.depositado == item.monto ) color="#fff";
      return <div style={{backgroundColor: color}} className="card">
            <div className="card-block">
        <p style={{marginBottom: 0}} className="card-title">{item.celular}
        </p>
        <small>{item.personas} pax</small>
        </div>
      </div>

    }
  },

  renderItems: function(dias){
    var _this = this;

    var renderedItems = []
    while(dias.jueves.length > 0 || dias.sabado.length > 0 || dias.domingo.length > 0) renderedItems.push( this.renderRow(dias) );
    return renderedItems;
  },

  renderRow: function(dias){
    return  <div key={Math.random()} className="row">
        <div className="col-xs-4 col-sm-4">

          { this.getForDay(dias, "jueves") }

        </div>
        <div className="col-xs-4 col-sm-4">
              { this.getForDay(dias, "sabado") }

        </div>
        <div className="col-xs-4 col-sm-4">
              { this.getForDay(dias, "domingo") }

        </div>
      </div>
  },


 render: function(){
  var _this = this;
  var items = this.props.items;

  var dias = { jueves: [], sabado: [], domingo: []}
  items.forEach( function(item){
    if( _this.state.celular.length > 0 && _this.state.celular.indexOf("x") > -1 && item.celular != _this.state.celular ) return false;
    if( item.jueves ) dias.jueves.push(item);
    if( item.sabado ) dias.sabado.push(item);
    if( item.domingo ) dias.domingo.push(item);
  })

  dias.jueves.sort()
  dias.sabado.sort()
  dias.domingo.sort()

  var stats = {conDeposito: 0, sinDeposito: 0,jueves: dias.jueves.length, sabado: dias.jueves.length, domingo: dias.jueves.length};
  this.props.items.forEach( function(item){
    if( item.depositado && item.depositado > 0 ) stats.conDeposito++;
    else stats.sinDeposito++;
  })

  return <div class="">
  <p style={{color: "red"}}>Faltan por depositar {stats.sinDeposito} personas, les agradecemos depositar para organizarnos mejor.</p>
  <h4 style={{marginTop: 40}}>Busque su confirmación:</h4>
  <div style={{marginBottom: 40}} className="container">
      <div style={{marginBottom: "40px 0px"}} className="form-group row">
        <div className="col-xs-12 col-sm-4">
          <input  ref="txt_celular" placeholder="Telefono Celular" value={this.state.celular} onChange={this.onChangeCelular} className="form-control" type="text" />
          <small>Ingrese su numero celular</small>
        </div>
        <div className="col-xs-12 col-sm-2">
          <button style={{marginTop: 0, display: "block", marginBottom: 20}} className="btn btn-primary" onClick={this.onSearch}>Buscar</button>
        </div>
      </div>
    </div>

    <p>Rojo = Sin Depositar.<br/><small>Las reservaciones sin deposito no tienen espacio asegurado.</small></p>
    <div className="container">

      <div className="row">
        <div className="col-xs-4 col-sm-4">
          <h4 className="-title">Jueves ({dias.jueves.length})</h4>
        </div>
        <div className="col-xs-4 col-sm-4">
          <h4 className="-title active">Sabado ({dias.sabado.length})</h4>
        </div>
        <div className="col-xs-4 col-sm-4">
          <h4 className="">Domingo ({dias.domingo.length})</h4>
        </div>
      </div>

      { this.renderItems(dias) }

    </div>

  </div>

 }

})

function replaceAll(target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
}

module.exports = Confirmados;
