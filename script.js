let openPopupButton = document.querySelector('.profile__open-popup');
let formPopup = document.querySelector('.popup');
//let openPopupButton = document.querySelector('.nav__button');
let closePopupButton = document.querySelector('.popup__reset-button');

openPopupButton.addEventListener('click', function () {
  formPopup.classList.add('popup_opened');
});
closePopupButton.addEventListener('click', function () {
  formPopup.classList.remove('popup_opened');
});