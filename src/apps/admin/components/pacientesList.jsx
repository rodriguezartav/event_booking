import React from 'react';
import moment from 'moment';

class PacienteListItem extends React.Component {

  constructor(props) {
    super(props);
  }



  render(){
    var _this = this;
    var item = this.props.item;
    console.log(item)
    return <li className="slds-feed__item">
          <article className="slds-post">
            <header className="slds-post__header slds-media">
              <div className="slds-media__body">
                <div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
                  <p><a>{item.nombre}</a> — <a></a></p>

                </div>
                <p className="slds-text-body_small"><a href="javascript:void(0);" title="Click for single-item view of this post" className="slds-text-link_reset">

                </a>
                </p>
              </div>
            </header>

            <footer className="slds-post__footer">
              <ul className="slds-post__footer-actions-list slds-list_horizontal">
                <li className="slds-col slds-item slds-m-right_medium">
                  <button title="Like this item" className="slds-button_reset slds-post__footer-action" aria-pressed="false">
                    <svg className="slds-icon slds-icon-text-default slds-icon_x-small slds-align-middle" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#phone_portrait"></use>
                    </svg>{item.telefono}</button>
                </li>

                <li className="slds-col slds-item slds-m-right_medium">
                  <button title="Share this item" className="slds-button_reset slds-post__footer-action">
                    <svg className="slds-icon slds-icon-text-default slds-icon_x-small slds-align-middle" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#user"></use>
                    </svg> {item.reservacion.total_personas}</button>
                </li>
                <li className="slds-col slds-item slds-m-right_medium">
                  <button title="Comment on this item" className="slds-button_reset slds-post__footer-action">
                    <svg className="slds-icon slds-icon-text-default slds-icon_x-small slds-align-middle" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#moneybag"></use>
                    </svg> saldo {item.reservacion.saldo} </button>
                </li>
              </ul>
              <ul className="slds-post__footer-meta-list slds-list_horizontal slds-has-dividers_right slds-text-title">
                <li className="slds-item">{item.reservacion.monto} Total</li>
                <li className="slds-item">{item.reservacion.saldo} Saldo</li>
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

  renderItems(){
    var _this = this;
    return this.props.items.map( function(item){
      return <PacienteListItem select={_this.props.onSelect} key={item.id} item={item} />
    } )
  }


  render(){

     return  <div className="slds-feed">
        <ul className="slds-feed__list">
        {this.renderItems()}
        </ul>
      </div>
  }
}

export default PacienteList;
