let formPopup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__open-popup');
let closePopupButton = document.querySelector('.popup__reset-button');
let submitButton = document.querySelector('.popup__submit-button');

function formOpen() {
  formPopup.classList.add('popup_opened');
}

function formClose() {
  formPopup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', formOpen);
closePopupButton.addEventListener('click', formClose);
submitButton.addEventListener('click', formClose);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__specification');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  let newSpecification = document.querySelector('.profile__specification');
  let newName = document.querySelector('.profile__title');
  newName.textContent = nameInput.value; 
  newSpecification.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler); 
