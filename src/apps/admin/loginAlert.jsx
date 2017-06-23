import React from 'react';

class LoginForm extends React.Component {

  render() {
    if( !this.props.message ) return null

    return <div className="slds-box slds-theme--error slds-text-align--left">
     <div class="slds-text-heading--large">{this.props.message}</div>
   </div>

  }
}


export default LoginForm;
