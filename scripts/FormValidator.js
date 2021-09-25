class FormValidator {
  constructor(config, formElement){
    this._formElement=formElement; 
    this._inputSelector=config.inputSelector;
    this._inputElement= this._formElement.querySelector(config.inputSelector);
    this._submitButtonSelector = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError = (errorElement, inputElement) => {
    console.log(errorElement, this._inputElement )
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError = (errorElement, inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

 _checkInputsValidity =(inputElement)=>{

    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
  
    if (!inputElement.validity.valid) {
      this._showInputError(this._errorElement, inputElement);
    } 
    else {
      this._hideInputError(this._errorElement, inputElement);
     
    }
  }

  enableValidation() {
    
  }


  _setEventListeners () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const listInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    listInputs.forEach(inputElement => {
   
  
      inputElement.addEventListener('input', (evt) => {
        
        evt.preventDefault();
      
        this._checkInputsValidity(inputElement);
       // toogleButtonsState(config, formElement);
      });
    });
  }

}