import React from 'react';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

    this.props.handleFormClick(this.refs);
  }

  render() {
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
}


export default LoginForm;
