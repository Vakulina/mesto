const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}; 
const showInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent =  inputElement.validationMessage;
   console.log('показать ошибку');
};
const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  console.log(' скрыть ошибку');
};
const checkInputsValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  console.log(inputElement.validity.valid);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
}
//const toogleButtonsState
const setInputsListeners = (formElement, inputSelector, errorClass, inputErrorClass)=>{
  const listInputs= Array.from(formElement.querySelectorAll(inputSelector));
  listInputs.forEach(inputElement =>{
    inputElement.addEventListener('input', e => {
    e.preventDefault();
    checkInputsValidity(formElement, inputElement, errorClass, inputErrorClass);

    });
  })
  }

const setFormsListeners = (formElement, inputSelector, errorClass, inputErrorClass)=>{
  formElement.addEventListener('submit', e=>{
    e.preventDefault();
    
  })
  setInputsListeners(formElement, inputSelector, errorClass, inputErrorClass);
  
}
const enableValidate = (config) => {
  const listForms = document.querySelectorAll(config.formSelector);
  listForms.forEach((formElement)=>{
    setFormsListeners(formElement, config.inputSelector, config.errorClass, config.inputErrorClas);
       
  });
}
enableValidate(config);
