let popup = document.querySelector('.popup');
let formPopup = popup.querySelector('.popup__form');
let openPopupButton = document.querySelector('.profile__open-popup');
let closePopupButton = popup.querySelector('.popup__reset-button');
let nameInput = formPopup.popup__name;
let jobInput = formPopup.popup__specification;
let profileSpecification = document.querySelector('.profile__specification');
let profileName = document.querySelector('.profile__title');

function formOpen() {
  popup.classList.add('popup_opened');
}
openPopupButton.addEventListener('click', formOpen);

function formClose() {
  popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', formClose);
formPopup.addEventListener('submit', formClose);  

function formSubmitHandler (evt) {
  evt.preventDefault(); 
 
  profileName.textContent = nameInput.value; 
  profileSpecification.textContent = jobInput.value;
}
formPopup.addEventListener('submit', formSubmitHandler);