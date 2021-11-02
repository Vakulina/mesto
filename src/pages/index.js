import { FormValidator } from '../components/FormValidator.js';
import {
  config, configConnection, cardsTemplateSelector, containerSelector,
  inputName, inputGob, formEditProfile, formNewPlace, formEditAvatar
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api.js'
import PopupForConfirm from '../components/PopupForConfirm.js';
import './index.css'; // добавьте импорт главного файла стилей 
let cardsList;
let userId;

const placeFormValidator = new FormValidator(config, formNewPlace);
placeFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, formEditProfile);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, formEditAvatar);
avatarFormValidator.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const createCard = (item) => {
  const card = new Card({
    data: { ...item, userId },
    handleCardClick: () => {
      imagePopup.open(item.link, item.name, item.name);
    },

    handleLikeClick: (card) => {
      api.likeCard(card.id(), card.hasLike())
        .then(data => {
          card.setLikesInfo({ ...data });
        })
        .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
    },
    handleBinClick: (card) => {
      cardDeletePopup.open(card);
    }
  },
    cardsTemplateSelector);
  return card.generateCard();
}

const newUserInfo = new UserInfo({
  nameSelector: '.profile__title',
  specializationSelector: '.profile__specification', avatarSelector: '.profile__img'
});

//колбэк функция для кнопки "редактировать профайл"
const handleProfileSubmit = () => {
  const data = newUserInfo.getUserInfo();
  inputName.value = data.name;
  inputGob.value = data.about;
  profileFormValidator.resetValidation();
  profileOpenedPopup.open();
}

const api = new Api(configConnection);

//запрос данных карточек с сервера
const promiseCardsLoad = api.getInitialCards()


//запрос данных профайла с сервера
const promiseProfileLoad = api.getInfoUserOfServ();

//после запроса всех данных с сервера идет их отрисовка
Promise.all([promiseProfileLoad, promiseCardsLoad])
  .then(([profileData, cardsData]) => {
    newUserInfo.setUserInfo(profileData)
    newUserInfo.setAvatar(profileData.avatar)
    userId = profileData._id
    //отсортируем массив объектов по убыванию даты, для корректной отрисовки
    cardsData.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt) });
    cardsList = new Section({
      items: cardsData,
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      }
    }, containerSelector);
    cardsList.renderItems();
  })
  .catch(err => console.log(`Ошибка загрузки данных с сервера: ${err}`))

//колбэк функция для сабмита формы попапа по редактированию профиля
const handleProfileSumbit = (data) => {
  profileOpenedPopup.renderLoading(true);
  api.setNewUserInfo(data)
    .then((data) => {
      newUserInfo.setUserInfo(data);
      profileOpenedPopup.close()
    })
    .catch(err => console.log(`Ошибка сохранения: ${err}`))
    .finally(() => {
      profileOpenedPopup.renderLoading(false);
    })
}

const profileOpenedPopup = new PopupWithForm('.popup_type_profile', handleProfileSumbit);
profileOpenedPopup.setEventListeners();
document.querySelector('.profile__open-popup').addEventListener('click', handleProfileSubmit);


//коллбэк функция сабмита попапа по добавлению карточки нового места
const handlePlaceFormSubmit = ({ place, link }) => {
  placeOpenedPopup.renderLoading(true);
  const data = { name: place, link: link };
  api.setNewCard(data)
    .then((res) => {
      cardsList.addItem(createCard(res));
      placeOpenedPopup.close()
    })
    .catch(err => console.log(`Ошибка сохранения: ${err}`))
    .finally(() => {
      placeOpenedPopup.renderLoading(false);
    })
}

const placeOpenedPopup = new PopupWithForm('.popup_type_place', handlePlaceFormSubmit);

placeOpenedPopup.setEventListeners()
document.querySelector('.profile__adding-button').addEventListener('click', () => {
  placeFormValidator.resetValidation();
  placeOpenedPopup.open();
})
//коллбэк функция по изменению аватара
const handleAvatarFormSubmit = (avatar) => {
  avatarChangingPopup.renderLoading(true)
  api.setAvatar(avatar)
    .then((res) => {
      newUserInfo.setAvatar(res.avatar)
      avatarChangingPopup.close();
    })
    .catch(err => console.log(`Ошибка сохранения аватара: ${err}`))
    .finally(() => {
      avatarChangingPopup.renderLoading(false);
    })
}

const avatarChangingPopup = new PopupWithForm('.popup_type_change-avatar', handleAvatarFormSubmit);

avatarChangingPopup.setEventListeners()
document.querySelector('.profile__avatar').addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarChangingPopup.open();
})

const handleDeleteCardSubmit = (card) => {
  api.deleteCard(card._id)
    .then(() => {
      card.deleteCard()
      cardDeletePopup.close();
    })
    .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
}

const cardDeletePopup = new PopupForConfirm('.popup_type_delete-card', handleDeleteCardSubmit)
cardDeletePopup.setEventListeners();


