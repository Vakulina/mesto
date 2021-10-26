import { FormValidator } from '../components/FormValidator.js';
import { config, initialCards, cardsTemplateSelector, containerSelector, inputName, inputGob, formEditProfile, formNewPlace } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {Api} from '../components/Api.js'
import './index.css'; // добавьте импорт главного файла стилей 


const placeFormValidator = new FormValidator(config, formNewPlace);
placeFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, formEditProfile);
profileFormValidator.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      imagePopup.open(item.link, item.place, item.place);
    }
  }, cardsTemplateSelector);
  return card.generateCard();
}

//первоначальная инициализация карточек на странице
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, containerSelector);
cardsList.renderItems();

//коллбэк функция сабмита попапа по добавлению карточки нового места
const handlePlaceFormSubmit = ({place, link}) => {
  cardsList.addItem(createCard({ place, link }));
}

const placeOpenedPopup = new PopupWithForm('.popup_type_place', handlePlaceFormSubmit);

placeOpenedPopup.setEventListeners()
document.querySelector('.profile__adding-button').addEventListener('click', () => {
  placeFormValidator.resetValidation();
  placeOpenedPopup.open();
})

const newUserInfo = new UserInfo({ nameSelector: '.profile__title', specializationSelector: '.profile__specification' });

//колбэк функция для кнопки "редактировать профайл"
const handleProfileEdit = () => {
  const data = newUserInfo.getUserInfo();
  inputName.value = data.name;
  inputGob.value = data.specification;
  profileFormValidator.resetValidation();
  profileOpenedPopup.open();
}

//колбэк функция для сабмита формы попапа по редактированию профиля
const handleProfileSumbit = (data) => {
  newUserInfo.setUserInfo(data);
}

const profileOpenedPopup = new PopupWithForm('.popup_type_profile', handleProfileSumbit);
profileOpenedPopup.setEventListeners();
document.querySelector('.profile__open-popup').addEventListener('click', handleProfileEdit);

fetch('https://nomoreparties.co/v1/cohort-29/users/me', {
  headers: {
    authorization: '1b533183-cd0b-49d7-a8aa-3f93cdc1c349'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 