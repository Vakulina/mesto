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
const toogleButtonsState = (config, popup)=>{
  const buttonElement = popup.querySelector(config.submitButtonSelector);
  const listInputs = Array.from(popup.querySelectorAll(config.inputSelector));
  if (((Boolean(buttonElement)) === true)&&(listInputs.length > 0))  { //проверка на то, что в попапе есть инпуты и кнопка
    if (hasInvalidInputs(listInputs)){
      buttonElement.classList.add(config.inactiveButtonClass);
    }
    else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }
}
const setEventListeners = (config, formElement)=>{
  formElement.addEventListener('submit', e=>{
    e.preventDefault();
  });
  const listInputs= Array.from(formElement.querySelectorAll(config.inputSelector));
  listInputs.forEach(inputElement => {
    inputElement.addEventListener('input', e => {
      e.preventDefault();
      checkInputsValidity(formElement, inputElement, config.errorClass, config.inputErrorClass);
      toogleButtonsState (config, formElement);
    });
  });
}
const enableValidate = (config) => {
  const listForms = document.querySelectorAll(config.formSelector);
  listForms.forEach((formElement)=>{
    setEventListeners(config, formElement);       
  });
}
enableValidate(config);



