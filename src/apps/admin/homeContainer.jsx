import React from 'react';
import PacienteList from "./components/pacientesList";
import PacienteDetail from "./components/pacienteDetail";
import Stat from "./components/stat";
import Style from "./style.css";

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state={view:"list"}
  }

  renderView(){
    if( this.state.view == "list" ) return <div>
      <PacienteList items={this.props.pacientes} />
    </div>
    else return <PacienteDetail />
  }


  render(){
    return <div >

      <div className="slds-size--5-of-12 slds-m-around--large slds-grid">

        <Stat dia="Jueves" fecha="Agosto 24" pacientes={this.props.stats.jueves}/>

        <Stat dia="Sabado" fecha="Agosto 26" pacientes={this.props.stats.sabado}/>

        <Stat dia="Domingo" fecha="Agosto 27" pacientes={this.props.stats.domingo}/>

      </div>


      <div className="slds-size--5-of-12 slds-m-around--large">
        {this.renderView()}
       </div>

       </div>
  }

}





export default HomeContainer;
