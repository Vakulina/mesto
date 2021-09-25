const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const showInputError = (inputElement, errorElement, errorClass, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}
const hideInputError = (inputElement, errorElement, errorClass, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const checkInputsValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, errorClass, inputErrorClass);
  } 
  else {
    hideInputError(inputElement, errorElement, errorClass, inputErrorClass);
  }
}
const hasInvalidInputs = (listInputs) => {
  return listInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
const toogleButtonsState = (config, popup) => {
  const buttonElement = popup.querySelector(config.submitButtonSelector);
  const listInputs = Array.from(popup.querySelectorAll(config.inputSelector));
  if (Boolean(buttonElement)) { //проверка на то, что в попапе есть кнопка
    if (hasInvalidInputs(listInputs)) {
      buttonElement.classList.add(config.inactiveButtonClass);
    }
    else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }
}
const setEventListeners = (config, formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const listInputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  listInputs.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      evt.preventDefault();
      checkInputsValidity(formElement, inputElement, config.errorClass, config.inputErrorClass);
      toogleButtonsState(config, formElement);
    });
  });
}


