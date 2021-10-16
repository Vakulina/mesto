import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit= handleFormSubmit.bind(this);
    this._form=this._popup.querySelector('.popup__form');
  }

  _getInputValues(){
  this._contentList = [];
  this._popup.querySelectorAll('input').forEach(element => {
    this._contentList.push(element.value);
});
return  this._contentList;
}
setEventListeners(){

  this._form.addEventListener('submit', (evt) => {

    this._getInputValues();
    this._handleFormSubmit(this._contentList);
    this.close()}
    );
  super.setEventListeners();
}
open(){

  super.open()
}
  close(){

    super.close();
    this._form.reset();
  
  }
}
