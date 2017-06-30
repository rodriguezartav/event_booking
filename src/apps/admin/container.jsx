import React from 'react'
import Business from "./business"
import LoginContainer  from "./loginContainer";
import HomeContainer  from "./homeContainer";

import Style from '../../style.css';


class Container extends React.Component {

  constructor(props) {
    super(props);
    this.business = new Business(this);
  }


  render() {
    if( this.state.view == "login" ) return <LoginContainer onLogin={this.business.onLogin} />
    else if( this.state.view == "home" ) return <HomeContainer stats={this.state.stats} pacientes={this.state.pacientes}/>
    return <div className="test">
        <h1>{this.props.name}</h1>
      </div>
  }
}

export default Container;
