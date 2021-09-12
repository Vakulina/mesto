const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}; 
const showInputError = (formElement, inputElement, errorElement, errorClass, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent =  inputElement.validationMessage;
}
const hideInputError = (formElement, inputElement, errorElement, errorClass, inputErrorClass) => { 
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const checkInputsValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorElement, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorElement, errorClass, inputErrorClass);
  }
}

const hasInvalidInputs = (listInputs) => {
 return listInputs.some((inputElement) =>{
    return !inputElement.validity.valid;
  });
}

const toogleButtonsState = (listInputs, formElement, submitButtonSelector, inactiveButtonClass)=>{
  const buttonElement = formElement.querySelector(submitButtonSelector);
 
  if (hasInvalidInputs(listInputs)){
    buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setInputsListeners = (formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass)=>{
  const listInputs= Array.from(formElement.querySelectorAll(inputSelector));
  listInputs.forEach(inputElement => {
    inputElement.addEventListener('input', e => {
      e.preventDefault();
      checkInputsValidity(formElement, inputElement, errorClass, inputErrorClass);
      toogleButtonsState(listInputs, formElement, submitButtonSelector, inactiveButtonClass);
    });
  })
}
const setFormsListeners = (formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass)=>{
  formElement.addEventListener('submit', e=>{
    e.preventDefault();
  });
  setInputsListeners(formElement, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass); 
}
const enableValidate = (config) => {
  const listForms = document.querySelectorAll(config.formSelector);
  listForms.forEach((formElement)=>{
    setFormsListeners(formElement, config.inputSelector, config.errorClass, config.inputErrorClass, config.submitButtonSelector, config.inactiveButtonClass);      
  });
}
enableValidate(config);

