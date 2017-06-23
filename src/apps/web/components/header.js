var React         = require("react");
var Business = require("../business");

var Header =  React.createClass({

  getMessage: function(){
    if(this.props.view == "reserve") return "Soy un programa hecho para ayudarte a reservar, si tenés problemas le podés escribir a mi creador. roberto@3vot.com"
    else if(this.props.view == "reserveConfirmation") return "Leé cuidadosamente las instrucciones:"
    else if(this.props.view == "contacto") return "Cualquier pregunta o duda con mucho gusto."
  },

  getHeading: function(){
    if(this.props.view == "reserve") return "Hola!!"
    else if(this.props.view == "reserveConfirmation") return "Gracias!!!"
    else if(this.props.view == "contacto") return "Preguntas?"
  },

  onClick: function(e){
    var type = parseInt(e.currentTarget.dataset.type);
    if( type == 0 ) Business.instance.onChangeView("reserve")
    else if( type == 2 ) Business.instance.onChangeView("contacto")
  },

  render: function(){
    return <div className="row">

    <div className="col-md-6 push-md-6">
      <div style={{margin: 10}} className="header clearfix ">
        <nav>
          <ul className="nav nav-pills float-xs-right">
            <li className="nav-item">
              <a data-type="0" onClick={this.onClick} className={ "nav-link " + ( this.props.view == "reserve" ? "active" : "" ) } href="#">Hola <span className="sr-only">(current)</span></a>
            </li>

            <li className="nav-item">
              <a data-type="2" onClick={this.onClick} className={ "nav-link " + ( this.props.view == "contacto" ? "active" : "") } href="#">Preguntas?</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>


      <div className="col-md-6 pull-md-6">
        <div className="" style={{paddingBottom: 0, paddingTop: 20}}>
          <h2 className="display-3">{this.getHeading()}</h2>
          <p className="lead">{this.getMessage()}</p>
          <hr className="my-2"/>
        </div>
      </div>


    </div>
  }
});

module.exports = Header;
