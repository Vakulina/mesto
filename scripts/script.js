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
const inputName = document.querySelector('.popup__input_type-name');
const inputGob = document.querySelector('.popup__input_type-specification');
const inputPlace = document.querySelector('.popup__input_type-place');
const inputLink = document.querySelector('.popup__input_type-link');
const cardTemplate = document.getElementById('place-card').content; //выбираем контейтер template с шаблоном карточки
const profileSpecification = document.querySelector('.profile__specification');
const profileName = document.querySelector('.profile__title');

const likesToggle = (event) => {        
   event.target.classList.toggle('place__like-button_active');
};
const deleteCard = (event) => {
  event.target.closest('.place').remove();
}
const openLargeImage =(event) => {
  const largeImage = imagePopup.querySelector('.popup__large-image');
  largeImage.src = event.target.src;
  largeImage.nextElementSibling.textContent = event.target.parentElement.querySelector('.place__paragraf').textContent;
  openForm(imagePopup);
}

let postingElement; 

const creatNewCard = (card) => {  //ф-я принимает на вход элемент массива карточек, возвращая новый элемент для публикации
  postingElement= cardTemplate.querySelector('.place').cloneNode(true); 
  const likeButton = postingElement.querySelector('.place__like-button'); 
  const buttonTrashPlace = postingElement.querySelector('.place__trash-button');
  const imgOpening = postingElement.querySelector('.place__img');
  postingElement.querySelector('.place__img').src = card.link; 
  postingElement.querySelector('.place__paragraf').textContent = card.name;
  imgOpening.alt = `Фото пользователя: ${card.name}`;
  likeButton.addEventListener('click', likesToggle ); 
  buttonTrashPlace.addEventListener('click', deleteCard); 
  imgOpening.addEventListener('click', openLargeImage);
  return postingElement;
}
const postingCard = (card) => { //ф-я, получая на вход элемент массива карточек, публикует новую карточку в начало элемента .places
  creatNewCard(card);
  const placeOfPublication = document.querySelector('.places'); 
  placeOfPublication.prepend(postingElement); 
};

initialCards.forEach(postingCard); //публикуем первоначальный массив карточек

//объявляем функции открытия и закрытия попапов
const openForm = (popup) => {  
  popup.classList.add('popup_opened');
}
const closeForm = (popup) => {
  popup.classList.remove('popup_opened');
}
const fillProfileForm = () => { //заполняем поля профайл-попапа данными активного пользователя
  inputName.value = profileName.textContent;
  inputGob.value = profileSpecification.textContent;
}

//добавляем слушатель кнопке "редактировать профиль" для открытия профайл-попапа
buttonOpenProfile.addEventListener('click', () => {
  openForm(profilePopup);
  fillProfileForm();
});

//закрытие попапов по нажатию на крестик
buttonCloseProfile.addEventListener('click', () => {
  closeForm(profilePopup); 
}); 
buttonClosePlace.addEventListener('click', () => {
  placePopup.querySelector('.popup__form_place').reset(); //очистка формы place при закрытии по крестику
  closeForm(placePopup); 
}); 
buttonCloseImage.addEventListener('click', () => {
  closeForm(imagePopup); 
})


function profileSubmitHandler (evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault(); 
  profileName.textContent = inputName.value; 
  profileSpecification.textContent = inputGob.value;
  closeForm(profilePopup);
}

submitProfile.addEventListener('submit', profileSubmitHandler);

buttonOpenPlacePopup.addEventListener('click', () => {
  openForm(placePopup);
});

function placeSubmitHandler (evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault(); 
  const newCard = {};
  newCard.name = inputPlace.value; 
  newCard.link = inputLink.value;
  postingCard(newCard);
  this.reset();
  closeForm(placePopup);
};

submitNewPlace.addEventListener('submit', placeSubmitHandler);
