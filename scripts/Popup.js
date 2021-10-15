
import {closeButtonSelector} from './utils/constants.js';

export default class Popup {
  constructor(popupSelector){
    this._popup=document.querySelector(popupSelector);
    this._closeButton=this._popup.querySelector(closeButtonSelector);
   
  }
  _handleEscPress (evt) {
    
    if (evt.key === 'Escape') {
      console.log(this);
      this.close();
    }
  }

  open(){
    this._popup.classList.add('popup_opened');
  document.addEventListener('keydown', this._handleEscPress.bind(this));
  }
 

  close(){
  this._popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._handleEscPress.bind(this));
}



  setEventListeners(){
      this._popup.addEventListener('click', (evt)=>{
      this._overlay=document.querySelector('.popup_opened');
      if((evt.target===this._overlay)||(evt.target===this._closeButton)){
      this.close();
      }
  })
}
}

