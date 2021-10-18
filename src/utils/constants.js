
import baikalImage from '../images/Baikal.jpg';
import moskowImage from '../images/Moskow.jpg';
import fiolentImage from '../images/Fiolent.jpg';
import petergofImage from '../images/Peterhof.jpg';
import rostovImage from '../images/Rostow.jpg';
import spbImage from '../images/SPB.jpg';


const initialCards = [
  {
    place: 'Байкал',
    link: baikalImage
  },
  {
    place: 'Москва',
    link: moskowImage
  },
  {
    place: 'Мыс Фиолент',
    link: fiolentImage
  },
  {
    place: 'Петергоф',
    link: petergofImage
  },
  {
    place: 'Ростов-на-Дону - столица Донского края',
    link: rostovImage
  },
  {
    place: 'Санкт-Петербург',
    link: spbImage
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