import React from 'react';
import Business from '../business';
var business;


class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    business= Business.business;
  }

  render(){
    if( this.props.pendingSave){ return <div role="status" className="slds-spinner slds-spinner_medium">
        <div className="slds-spinner__dot-a"></div>
        <div className="slds-spinner__dot-b"></div>
    </div>
    }
    else{
      return <div>
        <button onClick={this.props.onSave} type="button" className="slds-button slds-button--brand">{this.props.label || "Guardar"}</button>
      </div>
    }
  }
}

class ReservacionDetail extends React.Component {

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave(){
    var reservacion = {
      id: this.props.item.id,
      jueves: parseInt(this.refs.jueves.value) || 0,
      sabado: parseInt(this.refs.sabado.value) || 0,
      domingo: parseInt(this.refs.domingo.value) || 0,
      monto: parseInt(this.refs.monto.value) || 0,
    }
    reservacion.total_personas = reservacion.jueves + reservacion.sabado + reservacion.domingo;
    reservacion.saldo = reservacion.monto;
    business.saveReservacion(reservacion);
  }

  render(){
       return <div>

       <div className="demo-only" style={{background:"#f4f6f9",padding:"1rem"}}>
      <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap slds-is-editing">
        <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">

          <div className="slds-panel__section">
            <h3 className="slds-text-heading_small slds-m-bottom_medium">Reservacion</h3>
            <ul>

            <div className="slds-form-element  slds-m-top--small">
              <label className="slds-form-element__label" >Jueves</label>
              <div className="slds-form-element__control">
                <input type="number"  ref="jueves" className="slds-input" defaultValue={this.props.item.jueves}/>
              </div>
            </div>

            <div className="slds-form-element  slds-m-top--small">
              <label className="slds-form-element__label" >Sabado</label>
              <div className="slds-form-element__control">
                <input type="number"  ref="sabado" className="slds-input" defaultValue={this.props.item.sabado}/>
              </div>
            </div>

              <div className="slds-form-element  slds-m-top--small">
                <label className="slds-form-element__label" >Domingo</label>
                <div className="slds-form-element__control">
                  <input type="number"  ref="domingo" className="slds-input" defaultValue={this.props.item.domingo}/>
                </div>
              </div>

              <div className="slds-form-element  slds-m-top--small">
                <label className="slds-form-element__label" >Monto</label>
                <div className="slds-form-element__control">
                  <input type="number"  ref="monto" className="slds-input" defaultValue={this.props.item.monto}/>
                </div>
              </div>

              <div className="slds-form-element  slds-m-top--small">
                <label className="slds-form-element__label" >Saldo</label>
                <div className="slds-form-element__control">
                  <label className="slds-form-element__label slds-text-heading_small">$ {this.props.item.saldo}</label>

                </div>
              </div>

              <div className="slds-form-element slds-m-top--large">
                <div className="slds-form-element__control">
                  <SaveButton pendingSave={this.props.pendingSave} onSave={this.onSave} />
                </div>
              </div>

            </ul>

          </div>

          </div>

        </div>

        </div>
    </div>

  }
}

class PacienteDetail extends React.Component {

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);

  }

  onSave(){
    var paciente = this.props.item;
    paciente.nombre = this.refs.nombre.value;
    paciente.telefono = this.refs.telefono.value;
    paciente.email = this.refs.email.value;
    business.savePaciente(this.props.item);
  }

  render(){
       return <div>

       <div className="slds-col  demo-only slds-grid" style={{background:"#f4f6f9",padding:"1rem"}}>
      <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap slds-is-editing">
        <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">

          <div className="slds-panel__section">
            <h3 className="slds-text-heading_small slds-m-bottom_medium">Paciente</h3>
            <ul>
              <div className="slds-form-element slds-m-top--small">
                <label className="slds-form-element__label" htmlFor="text-input-01">Nombre</label>
                <div className="slds-form-element__control">
                  <input  className="slds-input" ref="nombre" defaultValue={this.props.item.nombre}/>
                </div>
              </div>
              <div className="slds-form-element  slds-m-top--small">
                <label className="slds-form-element__label" htmlFor="date-input-01">Email</label>
                <div className="slds-form-element__control">
                  <input className="slds-input" ref="email"  defaultValue={this.props.item.email}/>
                </div>
              </div>
              <div className="slds-form-element  slds-m-top--small">
                <label className="slds-form-element__label" htmlFor="date-input-01">Telefono</label>
                <div className="slds-form-element__control">
                  <input className="slds-input" ref="telefono"  defaultValue={this.props.item.telefono}/>
                </div>
              </div>

              <div className="slds-form-element slds-m-top--large">
                <div className="slds-form-element__control">
                <SaveButton pendingSave={this.props.pendingSave} onSave={this.onSave} />                </div>
              </div>

            </ul>
          </div>
          </div>
        </div>

        </div>
    </div>
  }
}

class PagoDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: "list"
    }
  }

  onShowPagoCreate(){
    this.setState({view: "create"})
  }

  onCreatePago(){
    Business.business.createPago(parseInt(this.refs.monto.value), this.refs.detalles.value);
    this.setState({view: "list"})
  }

  renderItems(){
    return this.props.items.map(function(item){
      return <tr key={item.id}>
        <th scope="row" data-label="Opportunity Name">
          <div className="slds-truncate">{item.detalles}</div>
        </th>

        <td data-label="Close Date">
          <div className="slds-truncate">$ {item.monto}</div>
        </td>
      </tr>
    })
  }

  renderRegister(){
     return <div className="slds-col  demo-only slds-grid" style={{background:"#f4f6f9",padding:"1rem"}}>
    <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap slds-is-editing">
      <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">

        <div className="slds-panel__section">
          <h3 className="slds-text-heading_small slds-m-bottom_medium">Registrar Pago</h3>

          <div className="slds-form slds-form_stacked">
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="input-id-01">Monto</label>
              <div className="slds-form-element__control">
                <input ref="monto" type="number" id="input-id-01" className="slds-input" placeholder="ie: 350"/>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="input-id-01">Referencia</label>
              <div className="slds-form-element__control">
                <input ref="detalles" type="text" id="input-id-01" className="slds-input" placeholder="ie: Banco Nacionl #4483738"/>
              </div>
            </div>
          </div>

          <div>
            <div className="slds-form-element__control slds-m-top--large">
              <SaveButton pendingSave={this.props.pendingSave} label="Guardar" onSave={this.onCreatePago.bind(this)} />
              <a className="slds-button slds-button__neutral">Cancelar</a>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>

  }


  renderList(){
       return <div>

       <div className="slds-col  demo-only slds-grid" style={{background:"#f4f6f9",padding:"1rem"}}>
      <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap slds-is-editing">
        <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">

          <div className="slds-panel__section">
            <h3 className="slds-text-heading_small slds-m-bottom_medium">Pagos</h3>

            <table className="slds-table slds-table_bordered  slds-table_striped">
              <thead>
                <tr className="">
                  <th scope="col">
                    <div className="slds-truncate" title="Opportunity Name">Numero</div>
                  </th>

                  <th scope="col">
                    <div className="slds-truncate" title="Close Date">Monto</div>
                  </th>

                </tr>
              </thead>
              <tbody>
                {this.renderItems()}
              </tbody>
            </table>
            <div className="slds-form-element slds-m-top--large">
              <div className="slds-form-element__control">
                <SaveButton pendingSave={this.props.pendingSave} label="Registrar Pago" onSave={this.onShowPagoCreate.bind(this)} />
              </div>
            </div>
          </div>

          </div>

        </div>

        </div>
    </div>
  }

  render(){
    if(this.state.view =="list") return this.renderList();
    else return this.renderRegister();
  }
}


class EmailDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  onSendEmail(){
    business.onSendBillingEmail()
  }

  renderItems(){
    return this.props.items.map(function(item){
      return <tr>
        <th scope="row" data-label="Opportunity Name">
          <div className="slds-truncate" ><a>{item.nombre}</a></div>
        </th>
        <td data-label="Account Name">
          <div className="slds-truncate">{item.created}</div>
        </td>
      </tr>
    })
  }

  render(){
       return <div>

       <div className="slds-col  demo-only slds-grid" style={{background:"#f4f6f9",padding:"1rem"}}>
      <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap slds-is-editing">
        <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">

          <div className="slds-panel__section">
            <h3 className="slds-text-heading_small slds-m-bottom_medium">Emails</h3>

            <table className="slds-table slds-table_bordered  slds-table_striped">
              <thead>
                <tr className="">
                  <th scope="col">
                    <div className="slds-truncate" title="Opportunity Name">Nombre</div>
                  </th>
                  <th scope="col">
                    <div className="slds-truncate" title="Account Name">Fecha</div>
                  </th>

                </tr>
              </thead>
              <tbody>
                {this.renderItems()}
              </tbody>
            </table>
            <div className="slds-form-element slds-m-top--large">
              <div className="slds-form-element__control">
              <SaveButton pendingSave={this.props.pendingSave} label="Enviar Email de Cobro" onSave={this.onSendEmail} />
              </div>
            </div>
          </div>

          </div>

        </div>

        </div>
    </div>
  }
}

class PacienteDetailView extends React.Component {

  constructor(props) {
    super(props);
  }

  onShowList(){
    business.onShowList();
  }

  renderError(){
    if( !this.props.error ) return <div></div>;
     return <div className="slds-box slds-theme--error slds-text-align--left">
      <div className="slds-text-heading--large">{this.props.error}</div>
    </div>
  }

  render(){
    return <div>
    <button onClick={this.onShowList} className="slds-button slds-button--brand  slds-m-bottom--large slds-m-top--large">Regresar a la Lista</button>
    <div className="slds-grid">
      <div className="slds-col slds-size--3-of-12 slds-m-right--large"><PacienteDetail pendingSave={this.props.pendingSave} item={this.props.item} /></div>
      <div className="slds-col slds-size--3-of-12 slds-m-right--large"><ReservacionDetail  pendingSave={this.props.pendingSave} item={this.props.item.reservacion}/></div>
      <div className="slds-col slds-size--3-of-12 slds-m-right--large"><PagoDetail  pendingSave={this.props.pendingSave} item={this.props.item} items={this.props.item.pagos}/></div>
      <div className="slds-col slds-size--3-of-12"><EmailDetail pendingSave={this.props.pendingSave} item={this.props.item} items={this.props.item.emails}/></div>
    </div>
    <div className="slds-form-element slds-m-top--large">
      <div className="slds-form-element__control">
        {this.renderError() }
      </div>
      </div>
    </div>
  }

}

export default PacienteDetailView;






