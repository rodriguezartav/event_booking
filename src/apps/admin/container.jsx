import React from 'react'
import Business from "./business"
import LoginContainer  from "./loginContainer";
import PacienteList from "./components/pacientesList";
import PacienteDetail from "./components/pacienteDetail";

import Style from '../../style.css';


class Container extends React.Component {

  constructor(props) {
    super(props);
    this.business = new Business(this);
  }


  renderView() {
    if( this.state.view == "login" ) return <LoginContainer onLogin={this.business.onLogin} />
    else if( this.state.view == "list" ) return <PacienteList stats={this.state.stats} items={this.state.pacientes} />
    else return <PacienteDetail pendingSave={this.state.pendingSave} error={this.state.error} item={this.state.paciente} />
  }

  render(){
    return <div className="slds-m-around--large">
      {this.renderView()}
    </div>
  }
}

export default Container;
