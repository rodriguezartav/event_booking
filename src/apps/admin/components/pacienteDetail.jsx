import React from 'react';

class PacienteDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  onChangeName(e){
    this.props.onChange("name",e.currentTarget.value);
  }

  onChangeCode(e) {
    this.props.onChange("code",e.currentTarget.value);
  }

  onSelectParentAccount(account_id) {
   this.props.onChange("parent_id", account_id);
  }

  onChangeType(e) {
    this.props.onChange("type",e.currentTarget.value);
  }

  onChangeRestart(e) {
    var value = e.currentTarget.value;
    if( value == "Restar en Debito" ) this.props.onChange("restarDebito");
    else this.props.onChange("restarCredito");
  }

  renderError(){
    if( !this.props.error ) return <div></div>;
     return <div className="slds-box slds-theme--error slds-text-align--left">
      <div className="slds-text-heading--large">{this.props.error}</div>
    </div>
  }

  renderSaveButton(){
    if( this.props.pendingSave){ return <div role="status" className="slds-spinner slds-spinner_medium">
        <div className="slds-spinner__dot-a"></div>
        <div className="slds-spinner__dot-b"></div>
    </div>
    }
    else{
      return <div>
        <button onClick={this.props.onCancel} type="button" className="slds-button slds-button--neutral slds-m-right--small">Cancelar</button>
        <button onClick={this.props.onSave} type="button" className="slds-button slds-button--brand">Guardar</button>
      </div>
    }
  }

  render(){
   return <div>

   <div className="slds-col  demo-only slds-grid" style={{background:"#f4f6f9",padding:"1rem"}}>
  <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap slds-is-editing">
    <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">

      <div className="slds-panel__section">
        <h3 className="slds-text-heading_small slds-m-bottom_medium">Detalles de la Cuenta</h3>
        <ul>
          <div className="slds-form-element slds-m-top--small">
            <label className="slds-form-element__label" htmlFor="text-input-01">Nombre</label>
            <div className="slds-form-element__control">
              <input onChange={this.onChangeName} className="slds-input" id="text-input-01" defaultValue={this.props.account.name}/>
            </div>
          </div>
          <div className="slds-form-element  slds-m-top--small">
            <label className="slds-form-element__label" htmlFor="date-input-01">Codigo</label>
            <div className="slds-form-element__control">
              <input onChange={this.onChangeCode} className="slds-input" id="date-input-01"  defaultValue={this.props.account.code}/>
            </div>
          </div>


        </ul>


        <ul>

          <div className="slds-form-element  slds-m-top--small">
            <label className="slds-form-element__label" htmlFor="non-text-input-01">Opciones Contables</label>
            <div className="slds-form-element__control">
              <div className="slds-select_container">
                <select onChange={this.onChangeRestart}  defaultValue={ this.props.account.substract_on_debit ? "Restar en Debito" : "Restar en Credito" } className="slds-select" id="non-text-input-01">
                  <option>Restar en Debito</option>
                  <option>Restar en Credito</option>
                </select>
              </div>
            </div>
          </div>

          <div className="slds-form-element  slds-m-top--small">
            <label className="slds-form-element__label" htmlFor="non-text-input-01">Opciones Contables</label>
            <div className="slds-form-element__control">
            </div>
          </div>

          <div className="slds-form-element slds-m-top--large">
            <div className="slds-form-element__control">
              {this.renderError() }
            </div>
            </div>

          <div className="slds-form-element slds-m-top--large">
            <div className="slds-form-element__control">
              { this.renderSaveButton() }
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

export default PacienteDetail;






