import { FormValidator } from './FormValidator.js';
import { config, initialCards } from './data.js';
import { Card } from './Card.js';
const profilePopup = document.querySelector('.popup_type_profile');
const placePopup = document.querySelector('.popup_type_place');
const imagePopup = document.querySelector('.popup_type_image');
const buttonOpenProfile = document.querySelector('.profile__open-popup');
const buttonCloseProfile = document.querySelector('.popup__reset-button_type_profile');
const buttonClosePlace = document.querySelector('.popup__reset-button_type_place');
const buttonCloseImage = document.querySelector('.popup__reset-button_type_image');
const submitProfile = profilePopup.querySelector('.popup__form_profile');
const submitNewPlace = placePopup.querySelector('.popup__form_place');
const buttonOpenPlacePopup = document.querySelector('.profile__adding-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputGob = document.querySelector('.popup__input_type_specification');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const profileSpecification = document.querySelector('.profile__specification');
const profileName = document.querySelector('.profile__title');

const renderCard = (item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, 'place-card');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.places').prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item);
});

//коллбэк слушателя по закрытию попапов по нажатию esc
const handleEscPress = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

//объявляем функции открытия и закрытия попапов
const openPopup = (popup) => {
  if (popup.classList.contains('popup_type_profile')) {
    profileFormValidator.validateOpenPopup()
  };
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
}

const resetInputs = (form) => {
  const listInputs = Array.from(form.querySelectorAll('.popup__input'));
  listInputs.forEach((arrElement) => {
    arrElement.value = '';
    if (arrElement.classList.contains('popup__input_type_error')) {
      arrElement.nextElementSibling.classList.remove('popup__error_visible');
      arrElement.classList.remove('popup__input_type_error');
    }
  });
  profileFormValidator.enableValidation();
}

const closePopup = (popup) => {
  const form = popup.querySelector('.popup__form');
  if (Boolean(form)) { //исключаем попап, в котором нет формы
    resetInputs(form);
    form.reset();
  }
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
}

const fillForm = (arr) => {
  arr.forEach((arrElement) => {
    arrElement.element.value = arrElement.content;
  })
}

//добавляем слушатель кнопке "редактировать профиль" для открытия профайл-попапа
buttonOpenProfile.addEventListener('click', () => {
  fillForm([{
    element: inputName,
    content: profileName.textContent
  },
  {
    element: inputGob,
    content: profileSpecification.textContent
  }]);
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

function profileSubmitHandler(evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSpecification.textContent = inputGob.value;
  closePopup(profilePopup);
}

submitProfile.addEventListener('submit', profileSubmitHandler);

buttonOpenPlacePopup.addEventListener('click', () => {
  openPopup(placePopup);
});

function placeSubmitHandler(evt) { //ф-я сабмитит форму добавления места
  evt.preventDefault();
  const newCard = {};
  newCard.name = inputPlace.value;
  newCard.link = inputLink.value;
  renderCard(newCard);
  closePopup(placePopup);
};

submitNewPlace.addEventListener('submit', placeSubmitHandler);
const listPopups = Array.from(document.querySelectorAll('.popup'));
listPopups.forEach((popup) => {

  //навесим слушатель на попап, закрывающий попап по щелчку на оверлей
  const childrenElement = popup.firstElementChild;

  childrenElement.addEventListener('mousedown', (evt) => {
    evt.stopPropagation();
  });
  popup.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    closePopup(popup);
  });
})
const listForms = document.querySelectorAll('.popup__form');


const placeFormValidator = new FormValidator(config, placePopup);
placeFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, profilePopup);
profileFormValidator.enableValidation();

export { openPopup, imagePopup }