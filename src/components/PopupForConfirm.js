import Popup from './Popup.js';
export default class PopupForConfirm extends Popup {
  constructor(popupSelector, handleDeleteCardSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleDeleteCardSubmit;
    this._form = document.querySelector(popupSelector).querySelector('form');
  }
  open(card) {
    this._card = card;
    super.open()
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card)
    })
    super.setEventListeners();
  }

}