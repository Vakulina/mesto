import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitbutton = this._popup.querySelector('.popup__submit-button');
    this._standartText = this._submitbutton.textContent;
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
  renderLoading(isLoading){
    if(isLoading){
      this._submitbutton.textContent = 'Сохранение...'
      }
    else{
      this._submitbutton.textContent = this._standartText;
    }
  }
  close() {
    super.close();
    this._form.reset();
  }
}
