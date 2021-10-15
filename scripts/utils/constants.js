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
const profileSelector = '.popup_type_profile';
const placeSelector = '.popup_type_place';
const imageSelector = '.popup_type_image';
const closeButtonSelector = '.popup__reset-button';
const openedPopupSelector ='popup_opened';
const largeImageSelector= '.popup__large-image';
const popupSumtitleSelector ='.popup__subtitle';


export { initialCards, config, cardsTemplateSelector, containerSelector, largeImageSelector, popupSumtitleSelector,
   imageSelector, placeSelector, profileSelector, closeButtonSelector, openedPopupSelector};
