import { FormValidator } from '../FormValidator.js';
import { config, initialCards, cardsTemplateSelector, containerSelector, inputName, inputGob, formEditProfile, formNewPlace } from '../utils/constants.js';
import { Card } from '../Card.js';
import Section from '../Section.js';
import PopupWithImage from '../PopupWithImage.js'
import PopupWithForm from '../PopupWithForm.js'
import UserInfo from '../UserInfo.js'

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
      imagePopup.open(item.link, item.name, item.name);
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
const handlePlaceFormSubmit = (arr) => {
  cardsList.addItem(createCard({ name: arr[0], link: arr[1] }));
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
  inputGob.value = data.specialization;
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