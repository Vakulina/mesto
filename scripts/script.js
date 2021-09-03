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

const cardTemplate = document.getElementById('place-card').content; //выбираем контейтер template с шаблоном карточки
const likesToggle = (event) => {        //функция ставит и убирает лайки
   event.target.classList.toggle('place__like-button_active');
};
const deleteCard = (event) => {
  event.target.closest('.place').remove();
}
const openBigImage = ()=>{

}

let postingElement; 
const creatNewCard = (card) => {
  postingElement= cardTemplate.querySelector('.place').cloneNode(true); //определим шаблон карточки и клонируем его для публикации 
  const likeButton = postingElement.querySelector('.place__like-button'); //находим кнопку лайков
  const buttonTrashPlace = postingElement.querySelector('.place__trash-button');
  const imgOpening = postingElement.querySelector('.place__img');
  postingElement.querySelector('.place__img').src = card.link; //опредяем содержимое каждого элемента карточки
  postingElement.querySelector('.place__paragraf').textContent = card.name;
  imgOpening.alt = `Фото пользователя: ${card.name}`;
  likeButton.addEventListener('click', likesToggle ); //вешаем слушатель на кнопку лайков  
  buttonTrashPlace.addEventListener('click', deleteCard);  //вешаем слушатель на кнопку с корзиной (удалить карточку)
  imgOpening.addEventListener('click', ()=>{
    console.log("big image");
  });
  return postingElement;
}
const postingCard = (card) => { 
  creatNewCard(card);
  const placeOfPublication = document.querySelector('.places'); //находим место публикации карточек
  placeOfPublication.prepend(postingElement); //помещаем новую карточку в документ};
};

initialCards.forEach(postingCard); //публикуем первоначальный массив карточек

//находим попапы 
const profilePopup = document.querySelector('.popup_type_profile'); 
const placePopup = document.querySelector('.popup_type_place');
const imagePopup = document.querySelector('.popup_type_image');
//находим кнопки
const buttonOpenProfile = document.querySelector('.profile__open-popup');
const buttonCloseProfile = document.querySelector('.popup__reset-button_profile');
const buttonClosePlace = document.querySelector('.popup__reset-button_place');
const submitProfile = profilePopup.querySelector('.popup__form_profile');
const submitNewPlace = placePopup.querySelector('.popup__form_place');
//находим инпуты
let inputName = document.querySelector('.popup__input_type-name');
let inputGob = document.querySelector('.popup__input_type-specification');
let inputPlace = document.querySelector('.popup__input_type-place');
let inputLink = document.querySelector('.popup__input_type-link');



const profileSpecification = document.querySelector('.profile__specification');
const profileName = document.querySelector('.profile__title');

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



function profileSubmitHandler (evt) { //ф-я сабмитит форму редактирования профайла
  evt.preventDefault(); 
  profileName.textContent = inputName.value; 
  profileSpecification.textContent = inputGob.value;
  closeForm(profilePopup);
}

submitProfile.addEventListener('submit', profileSubmitHandler);

buttonOpenPlacePopup = document.querySelector('.profile__adding-button');
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


submitNewPlace.addEventListener('submit', placeSubmitHandler );
