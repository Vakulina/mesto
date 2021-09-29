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

  _showInputError = (errorElement, inputElement) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputsValidity = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(this._errorElement, inputElement);
    }
    else {
      this._hideInputError(this._errorElement, inputElement);

    }
  }

  _hasInvalidInputs() {

    return this._listInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toogleButtonsState() {

    if (this._hasInvalidInputs()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  validateOpenPopup() {  //проверяем состояние кнопки при открытии попапа
    this._toogleButtonsState();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toogleButtonsState();

    });
    this._formElement.addEventListener('reset', (evt) => {
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
