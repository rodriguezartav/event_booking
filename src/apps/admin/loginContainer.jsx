import React from 'react';
import LoginForm from './loginForm'
import LoginAlert from './loginAlert'
import LoginSpinner from './loginSpinner'

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      spinner: false
    }
    this.handleFormClick = this.handleFormClick.bind(this);
  }

  handleFormClick(refs){
   this.props.onLogin(refs.email.value, refs.password.value);
  }

  render(){
    return <div className="slds-grid slds-grid--align-center">
      <div>

      <div role="dialog" tabIndex="-1" aria-labelledby="header43" className="slds-modal slds-fade-in-open">
        <div className="slds-modal__container">
          <div className="slds-modal__header">
            <h2 id="header43" className="slds-text-heading--medium">Ingreso al Sistema de Reservaciones</h2>
          </div>

          <div className="slds-modal__content slds-p-around--medium">
            <LoginForm handleFormClick={this.handleFormClick.bind(this)}/>
          </div>

          <div className="slds-modal__footer">
            <LoginAlert message={this.state.message}/>
            <LoginSpinner active={this.state.spinner}/>
          </div>
        </div>

      </div>

      <div className="slds-backdrop slds-backdrop--open"></div>

      </div>
    </div>
  }

}

export default LoginContainer;
