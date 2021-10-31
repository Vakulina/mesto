import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList = Array.from(this._popup.querySelectorAll('input'));
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
      return this._formValues;
  }
  
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._getInputValues();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    }
    );
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
