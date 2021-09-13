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
const cardTemplate = document.getElementById('place-card').content; //выбираем контейтер template с шаблоном карточки
const profileSpecification = document.querySelector('.profile__specification');
const profileName = document.querySelector('.profile__title');
const largeImage = imagePopup.querySelector('.popup__large-image');
const cardList = document.querySelector('.places');
const toggleLike = (event) => {        
   event.target.classList.toggle('place__like-button_active');
}
const deleteCard = (event) => {
  event.target.closest('.place').remove();
}
const openLargeImage =(event) => {
  largeImage.src = event.target.src;
  largeImage.alt = event.target.parentElement.querySelector('.place__paragraf').textContent;
  largeImage.nextElementSibling.textContent = event.target.parentElement.querySelector('.place__paragraf').textContent;
  openPopup(imagePopup);
}
const createNewCard = (card) => {  //ф-я принимает на вход элемент массива карточек, возвращая новый элемент для публикации
  const newCard= cardTemplate.querySelector('.place').cloneNode(true); 
  const likeButton = newCard.querySelector('.place__like-button'); 
  const buttonTrashPlace = newCard.querySelector('.place__trash-button');
  const imgOpening = newCard.querySelector('.place__img');
  newCard.querySelector('.place__img').src = card.link; 
  newCard.querySelector('.place__paragraf').textContent = card.name;
  imgOpening.alt = `Фото пользователя: ${card.name}`;
  likeButton.addEventListener('click', toggleLike); 
  buttonTrashPlace.addEventListener('click', deleteCard); 
  imgOpening.addEventListener('click', openLargeImage);
  return newCard;
}
const renderCard = (card) => { //ф-я, получая на вход элемент массива карточек, публикует новую карточку в начало элемента .places
  const renderingCard = createNewCard(card);
  cardList.prepend(renderingCard); 
}

initialCards.forEach(renderCard); //публикуем первоначальный массив карточек

//коллбэк слушателя по закрытию попапов по нажатию esc
const handleEscPress = (evt)=> {
  const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      closePopup(openedPopup);
}}

//объявляем функции открытия и закрытия попапов
const openPopup = (popup) => {  
  toogleButtonsState(config, popup);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
}

const closePopup = (popup) => {
  popup.querySelector('.popup__form').reset();
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
}

const fillProfileForm = () => { //заполняем поля профайл-попапа данными активного пользователя
  inputName.value = profileName.textContent;
  inputGob.value = profileSpecification.textContent;
}

//добавляем слушатель кнопке "редактировать профиль" для открытия профайл-попапа
buttonOpenProfile.addEventListener('click', () => {
  fillProfileForm();
  openPopup(profilePopup);
});

//закрытие попапов по нажатию на крестик
buttonCloseProfile.addEventListener('click', () => {
  closePopup(profilePopup); 
}); 

buttonClosePlace.addEventListener('click', () => {
  closePopup(placePopup); 
}); 
buttonCloseImage.addEventListener('click', () => {
  closePopup(imagePopup); 
})

function profileSubmitHandler (evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault(); 
  profileName.textContent = inputName.value; 
  profileSpecification.textContent = inputGob.value;
  closePopup(profilePopup);
}

submitProfile.addEventListener('submit', profileSubmitHandler);

buttonOpenPlacePopup.addEventListener('click', () => {
  openPopup(placePopup);
});

function placeSubmitHandler (evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault(); 
  const newCard = {};
  newCard.name = inputPlace.value; 
  newCard.link = inputLink.value;
  renderCard(newCard);
  closePopup(placePopup);
};

submitNewPlace.addEventListener('submit', placeSubmitHandler);
const listPopups= Array.from(document.querySelectorAll('.popup'));
listPopups.forEach( (popup)=> {

//навесим слушатель на попап, закрывающий попап по щелчку на оверлей
const listChildren = Array.from(popup.children);

listChildren.forEach( (children)=> {
  children.addEventListener('mousedown', (evt) => {
    evt.stopPropagation();
  });
});
  popup.addEventListener('mousedown', (evt)=>{
    evt.preventDefault();
    closePopup(popup);
  });
});
