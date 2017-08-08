import React from 'react';
import moment from 'moment';
import Stat from "./stat";
import Business from "../business"
var business;

class PacienteListItem extends React.Component {

  constructor(props) {
    super(props);
    business= Business.business;
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(){
    business.onSelectPaciente(this.props.item)
  }

  render(){
    var _this = this;
    var item = this.props.item;
    return <li className="slds-feed__item">
          <article className="slds-post">
            <header className="slds-post__header slds-media">
              <div className="slds-media__body">
                <div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
                  <p><a onClick={this.onSelect}>{item.nombre}</a> — <a></a></p>

                </div>
                <p className="slds-text-body_small"><a href="javascript:void(0);" title="Click for single-item view of this post" className="slds-text-link_reset">

                </a>
                </p>
              </div>
            </header>

            <footer className="slds-post__footer">
              <ul className="slds-post__footer-actions-list slds-list_horizontal">
                <li style={{width: 130}} className="slds-col slds-item slds-m-right_x-">
                  <button title="Like this item" className="slds-button_reset slds-post__footer-action" aria-pressed="false">
                    <svg className="slds-icon slds-icon-text-default slds-icon_x-small slds-align-middle" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#phone_portrait"></use>
                    </svg>{item.telefono}</button>
                </li>

                <li className="slds-col slds-item slds-m-right_large">
                  <button title="Share this item" className="slds-button_reset slds-post__footer-action">
                    <svg className="slds-icon slds-icon-text-default slds-icon_x-small slds-align-middle" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#user"></use>
                    </svg> {item.reservacion.total_personas}</button>
                </li>
                <li className="slds-col slds-item slds-m-right_medium">
                  <button title="Comment on this item" className="slds-button_reset slds-post__footer-action">
                    <svg className="slds-icon slds-icon-text-default slds-icon_x-small slds-align-middle" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#moneybag"></use>
                    </svg> saldo $ {item.reservacion.saldo} </button>
                </li>
              </ul>
              <ul className="slds-post__footer-meta-list slds-list_horizontal slds-has-dividers_right slds-text-title">
                <li className="slds-item">{item.reservacion.jueves ? "Jueves" : null}</li>
                <li className="slds-item">{item.reservacion.sabado ? "Sabado" : null}</li>
                <li className="slds-item">{item.reservacion.domingo ? "Domingo" : null}</li>
              </ul>
            </footer>
          </article>
        </li>
  }


}

class PacienteList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderStats(){
    return <div className="slds-size--5-of-12 slds-m-around--large slds-grid">

      <Stat dia="Jueves" fecha="Agosto 24" pacientes={this.props.stats.jueves}/>

      <Stat dia="Sabado" fecha="Agosto 26" pacientes={this.props.stats.sabado}/>

      <Stat dia="Domingo" fecha="Agosto 27" pacientes={this.props.stats.domingo}/>

      <Stat dia="Total" fecha="vendido"  showLegend={false} pacientes={this.props.stats.total}/>

      <Stat dia="Saldo" fecha="por cobrar" showLegend={false}  pacientes={this.props.stats.saldo}/>


    </div>
  }

  renderItems(){
    var _this = this;
    return this.props.items.map( function(item){
      return <PacienteListItem onSelect={_this.props.onSelect} key={item.id} item={item} />
    } )
  }

  renderCalendar(){

    var jueves = [];
    var sabado = [];
    var domingo = [];

    return this.props.items.map( function(item){
      return <div style={{borderBottom: "1px solid #ddd"}} key={item.id} className="slds-grid">
        <div className="slds-col slds-size--6-of-12">
        {item.nombre}
        </div>

        <div className="slds-col slds-size--2-of-12">
        {item.reservacion.jueves}
        </div>

        <div className="slds-col slds-size--2-of-12">
        {item.reservacion.sabado}

        </div>

        <div className="slds-col slds-size--2-of-12">
        {item.reservacion.domingo}

        </div>
        </div>
    })



  }

  render(){

     return  <div className="slds-grid"><div className="slds-size--6-of-12 ">
     {this.renderStats()}
     <div className="slds-feed">
        <ul className="slds-feed__list">
        {this.renderItems()}
        </ul>
      </div>
      </div>
      <div className="slds-size--5-of-12 slds-m-top-xx-large">
        <div className="slds-m-left--small slds-p-around--medium" style={{borderLeft: "2px solid orange", height: 500, marginTop: 241}}>

          <div className="slds-text-heading--medium slds-m-bottom--medium">Calendario</div>

          <div className="slds-grid slds-text-heading--small">
                  <div className="slds-col slds-size--6-of-12">
                  Nombre
                  </div>

                  <div className="slds-col slds-size--2-of-12">
                  Jueves
                  </div>

                  <div className="slds-col slds-size--2-of-12">
                  Sabado
                  </div>

                  <div className="slds-col slds-size--2-of-12">
                  Domingo
                  </div>
                  </div>

           {this.renderCalendar()}



        </div>
      </div>
      </div>
  }
}

export default PacienteList;
