import { FormValidator } from '../FormValidator.js';
import { config, initialCards, cardsTemplateSelector, containerSelector, imageSelector, placeSelector, profileSelector } from '../utils/constants.js';
import { Card } from '../Card.js';
import Section from '../Section.js';
import Popup from '../Popup.js';
import PopupWithImage from '../PopupWithImage.js'
import PopupWithForm from '../PopupWithForm.js'
const profilePopup = document.querySelector('.popup_type_profile');
const placePopup = document.querySelector('.popup_type_place');

const buttonOpenProfile = document.querySelector('.profile__open-popup');
const buttonCloseProfile = document.querySelector('.popup__reset-button_type_profile');
const buttonClosePlace = document.querySelector('.popup__reset-button_type_place');
const buttonCloseImage = document.querySelector('.popup__reset-button_type_image');
const formEditProfile = profilePopup.querySelector('.popup__form_profile');
const formNewPlace = placePopup.querySelector('.popup__form_place');
const buttonOpenPlacePopup = document.querySelector('.profile__adding-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputGob = document.querySelector('.popup__input_type_specification');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const profileSpecification = document.querySelector('.profile__specification');
const profileName = document.querySelector('.profile__title');
const placeSection = document.querySelector('.places');


const placeFormValidator = new FormValidator(config, formNewPlace);
placeFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, formEditProfile);
profileFormValidator.enableValidation();




const imagePopup= new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const createCard =(item)=>{

    const card = new Card({data:item,
                          handleCardClick: () => {
                            imagePopup.open(item.link, item.name,  item.name);
                          }
                          
              },  cardsTemplateSelector );
return card.generateCard();

}

//первоначальная инициализация карточек на странице
const cardsList = new Section({
  items: initialCards,

  renderer: (item)=>{
    cardsList.addItem(createCard(item));
    }

  }, containerSelector);

cardsList.renderItems()




const handlePlaceFormSubmit = (arr) => {

  cardsList.addItem(createCard({name:arr[0], link:arr[1]}));

    }


//const profilePopup= new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
/*-
profilePopup.setEventListeners()
document.querySelector('.profile__open-popup').addEventListener('click', ()=>{
  profilePopup.open();
} )*/


const placeOpenedPopup= new PopupWithForm('.popup_type_place', handlePlaceFormSubmit);

placeOpenedPopup.setEventListeners()
document.querySelector('.profile__adding-button').addEventListener('click', ()=>{
  placeFormValidator.resetValidation();
 // placeFormValidator.hideInputError();
  placeOpenedPopup.open();

} )




/*


//коллбэк слушателя по закрытию попапов по нажатию esc


//объявляем функции открытия и закрытия попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
}

const resetInputs = (popup) => {//очистка значений полей попапа при закрытии формы + сброс ошибок
  const listInputs = Array.from(popup.querySelectorAll('.popup__input'));
  listInputs.forEach((arrElement) => {
    arrElement.value = '';
    placeFormValidator.hideInputError(arrElement);
  });
}

//добавляем слушатель кнопке "редактировать профиль" для открытия профайл-попапа
buttonOpenProfile.addEventListener('click', () => {
  formEditProfile.reset();
  inputName.value= profileName.textContent
  inputGob.value= profileSpecification.textContent;
  openPopup(profilePopup);
})

//закрытие попапов по нажатию на крестик
buttonCloseProfile.addEventListener('click', () => {
  closePopup(profilePopup);
})
buttonClosePlace.addEventListener('click', () => {
  closePopup(placePopup);
})
buttonCloseImage.addEventListener('click', () => {
  closePopup(imagePopup);
})

function handleSubmitProfile(evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpecification.textContent = inputGob.value;
  closePopup(profilePopup);
}

formEditProfile.addEventListener('submit', handleSubmitProfile);




const createCard = (item) => {
  // Создадим экземпляр карточки
          const card = new Card(item, 'place-card');
          // Создаём карточку и возвращаем наружу
          const cardElement = card.generateCard();
          return cardElement;
}
const renderCard=(cardElement)=>{
  // Добавляем в DOM
 placeSection.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(createCard(item));

});

function handleSubmitPlace (evt) { //ф-я сабмитит форму добавления места
  evt.preventDefault();
  const newCard = {};
  newCard.name = inputPlace.value;
  newCard.link = inputLink.value;
  renderCard(createCard(newCard));
  closePopup(placePopup);
};

formNewPlace.addEventListener('submit', handleSubmitPlace);

*/