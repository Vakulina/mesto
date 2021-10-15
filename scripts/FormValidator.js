export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._listInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputElement = this._formElement.querySelector(config.inputSelector);
    this._submitButton = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError = ( inputElement) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError = (inputElement) => {
  
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputsValidity = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInputs() {

    return this._listInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
 _hasEmptyInput(){
  return this._listInputs.every(inputElement => {
    return inputElement.validity.length === 0;
 })}
 


_toogleButtonsState() {

    if ((this._hasInvalidInputs())||(this._hasEmptyInput())) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true; 
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  resetValidation() {
    this._toogleButtonsState();
    this._listInputs.forEach(inputElement => {
        this._hideInputError(inputElement);
    });
     }


  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toogleButtonsState();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._listInputs.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        evt.preventDefault();
        this._checkInputsValidity(inputElement);
        this._toogleButtonsState();
      });
    });
  }
}
