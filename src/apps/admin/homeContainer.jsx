import React from 'react';

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  renderApps(){
    var apps = [
      {link: "resultados.html", colorNumber: 6, name: "Dashboard", icon: "rows",description: "Vea el estado de todas las Reservaciones",code: "ES"},
      {link: "journals.html", colorNumber: 27, name: "Pacientes", icon: "rows",description: "Ingresar los nuevos asientos del dia",code: "AS"},
      {link: "mayor.html",colorNumber: 91, name: "Reservaciones", icon: "rows",description: "Ver el impacto de los asientos en los libros mayores y aplicar",code: "AS"},
      {link: "comprobacion.html" ,colorNumber: 59, name: "Depositos", icon: "rows",description: "Ver el balance de cuentas histotico por periodo",code: "HS"},
    ]
    var items = [];
    apps.forEach( function(item){
      items.push( <AppItem key={item.name} item={item}/> );
    })
    return items;
  }

  render(){
    return <div >
       <div className="slds-modal__container slds-m-top--large">
         <div className="slds-modal__header slds-app-launcher__header slds-grid slds-grid--align-spread slds-grid--vertical-align-center">

           <h2 id="header43" className="slds-text-heading--medium">Applicaciones</h2>

         </div>
         <div className="slds-modal__content slds-app-launcher__content slds-p-around--medium">
           <div className="slds-section slds-is-open">
             <div className="slds-section__title">
               <button className="slds-button slds-button--icon slds-m-right--small">
                 <svg className="slds-button__icon" aria-hidden="true">
                   <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>
                 </svg>
                 <span className="slds-assistive-text">Toggle visibility of section</span>
               </button>
               <h3>Apps</h3>
             </div>
             <div className="slds-section__content">
               <ul className="slds-grid slds-grid--pull-padded slds-wrap">
                 { this.renderApps() }
               </ul>
             </div>
           </div>
           <hr/>

         </div>
       </div>
       </div>
  }

}


class AppItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <li key={this.props.item.name} className="slds-p-horizontal--small slds-size--1-of-1 slds-medium-size--1-of-2">
                <a href={this.props.item.link} className="slds-app-launcher__tile slds-text-link--reset slds-is-draggable">
                  <div className="slds-app-launcher__tile-figure">
                    <span className={"slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-" + this.props.item.colorNumber}>{this.props.item.code}</span>
                    <span className="slds-icon_container" title="Drag item to a new location">
                      <svg className="slds-icon slds-icon--x-small slds-icon-text-default" aria-hidden="true">
                        <use xlinkHref={"/assets/icons/utility-sprite/svg/symbols.svg#" + this.props.item.icon }></use>
                      </svg>
                    </span>
                  </div>
                  <div className="slds-app-launcher__tile-body">
                    <span className="slds-text-link">{this.props.item.name}</span>
                    <p>{this.props.item.description}
                    </p>
                  </div>
                </a>
              </li>
  }

}


export default HomeContainer;
