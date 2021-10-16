const initialCards = [
  {
    name: 'Байкал',
    link: './images/Baikal.jpg'
  },
  {
    name: 'Москва',
    link: './images/Moskow.jpg'
  },
  {
    name: 'Мыс Фиолент',
    link: './images/Fiolent.jpg'
  },
  {
    name: 'Петергоф',
    link: './images/Peterhof.jpg'
  },
  {
    name: 'Ростов-на-Дону - столица Донского края',
    link: './images/Rostow.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/SPB.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
const cardsTemplateSelector = 'place-card';
const containerSelector = '.places';
const closeButtonSelector = '.popup__reset-button';
const openedPopupSelector ='popup_opened';
const largeImageSelector= '.popup__large-image';
const popupSumtitleSelector ='.popup__subtitle';
const inputName = document.querySelector('.popup__input_type_name');
const inputGob = document.querySelector('.popup__input_type_specification');
const formEditProfile = document.querySelector('.popup__form_profile');
const formNewPlace = document.querySelector('.popup__form_place');


export { initialCards, config, cardsTemplateSelector, containerSelector, largeImageSelector, popupSumtitleSelector,
  closeButtonSelector, openedPopupSelector, inputName, inputGob, formEditProfile, formNewPlace};