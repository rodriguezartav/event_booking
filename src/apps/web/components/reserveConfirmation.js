var React         = require("react");
var Business = require("../business");


var ReserveConfirmation =  React.createClass({

  render: function(){
    return <div>

    <strong>Para confirmar tu reservación</strong>

    <p>Realizá el deposito ( al menos 50% para confirmar ), en el concepto del deposito debe ir el numero celular.</p>

     <h5>Instrucciones del Depósito</h5>

     <ul>
       <li>BNCR: 200-02-084-008661-0</li>
       <li>SINPE: 15108420020086611</li>
       <li>Cedula: 800470448</li>
       <li>A Nombre de: Carolina Dada Santos</li>
       <li>Monto: ${this.props.record.monto}</li>
       <li>Concepto: {this.props.record.celular}</li>
     </ul>

     <p><strong>Recuerda que el concepto o descripción debe ser solamente el celular.</strong>
      <br/><small>No hace falta el nombre, email. Solamente celular.</small></p>

     <h4>Preguntas Frecuentes</h4>
     <p><strong>Puedo depositar el 50%?</strong><br/>Si. Solo recordá que debés realizar el pago completo 3 semanas antes de la ceremonia.</p>
     <p><strong>Puedo cancelar mi reservacion?</strong><br/>Si claro con tiempo le devolveremos el dinero. Si cancelás una semana antes o menos, solo te podremos devolver el 50%.</p>

    </div>
  }
});

module.exports = ReserveConfirmation;
