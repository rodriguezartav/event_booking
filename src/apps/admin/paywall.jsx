import React from 'react';

class Paywall extends React.Component {

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

    this.props.handleFormClick(this.refs);
  }

  renderForm() {
    return <form className="slds-form--inline">
        <div className="slds-form-element">
          <label className="slds-form-element__label" htmlFor="name">Email</label>
          <div className="slds-form-element__control">
            <input ref="email" type="text" className="slds-input" />
          </div>
        </div>
        <div className="slds-form-element">
          <label className="slds-form-element__label" htmlFor="email">Password</label>
          <div className="slds-form-element__control">
            <input ref="password" type="password" className="slds-input" />
          </div>
        </div>
        <div className="slds-form-element">
          <button onClick={this.handleClick} type="button" className="slds-button slds-button--brand">Send</button>
        </div>


      </form>
  }

  render(){
    return <div className="slds-grid slds-grid--align-center">
      <div>

      <div role="dialog" tabIndex="-1" aria-labelledby="header43" className="slds-modal slds-fade-in-open">
        <div className="slds-modal__container">
          <div className="slds-modal__header">

            <h2 id="header43" className="slds-text-heading--medium">Ingreso al Sistema Contable</h2>
          </div>
          <div className="slds-modal__content slds-p-around--medium">

         <LoginForm handleFormClick={this.handleFormClick}/>


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


export default Paywall;
