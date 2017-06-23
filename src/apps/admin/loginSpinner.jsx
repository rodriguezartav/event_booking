import React from 'react';

class LoginSpinner extends React.Component {

  render() {
    if( !this.props.active ) return null;

    return <div className="slds-spinner_container">
      <div role="status" className="slds-spinner slds-spinner--medium">
        <span className="slds-assistive-text">Loading</span>
        <div className="slds-spinner__dot-a"></div>
        <div className="slds-spinner__dot-b"></div>
      </div>
    </div>

  }
}


export default LoginSpinner;


