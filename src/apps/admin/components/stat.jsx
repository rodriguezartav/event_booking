import React from 'react';

class Stat extends React.Component {

  render(){
   return <div className="demo-only slds-grid panel slds-m-right--large" >
      <div className="slds-panel slds-grid slds-grid_vertical slds-nowrap">
        <div className="slds-form slds-form_stacked slds-grow slds-scrollable_y">
          <div className="slds-panel__section slds-border_bottom">
            <div className="slds-media">
              <div className="slds-media__figure">
              </div>
              <div className="slds-media__body">
                <h2 className="slds-truncate slds-text-heading_small" title="Follow up on '15 contact">
                <a href="javascript:void(0);">{this.props.dia}</a></h2>
                <p className="slds-truncate slds-text-body_small" title="Jun 18">{this.props.fecha}</p>

              </div>
            </div>
          </div>
          <div className="slds-panel__section">
            <ul>
              <li className="slds-form-element slds-hint-parent slds-border_bottom">
                <span className="slds-form-element__label">Pacientes Reservados</span>
                <div className="slds-form-element__control">
                  <h3 className="slds-text-heading_small slds-m-bottom_medium">{this.props.pacientes || 0}</h3>

                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  }
}

export default Stat;









