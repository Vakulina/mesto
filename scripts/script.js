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

const cardTemplate = document.getElementById('place-card').content;
const likesToggle = (event) => {        //функция ставит и убирает лайки
   event.target.classList.toggle('place__like-button_active');
};

const postingCard = (card) => {    //функция публикации карточки
  const postingElement = cardTemplate.querySelector('.place').cloneNode(true); //определим шаблон карточки и клонируем его для публикации 
  const likeButton = postingElement.querySelector('.place__like-button'); //найдем кнопку лайков
  const placeOfPublication = document.querySelector('.places'); //найдем место публикации карточек
  
  postingElement.querySelector('.place__img').src = card.link; //определим содержимое каждого элемента карточки
  postingElement.querySelector('.place__paragraf').textContent = card.name;
  postingElement.querySelector('.place__img').alt = `Фото пользователя: ${card.name}`;
  placeOfPublication.prepend(postingElement); //поместим новую карточку в документ
  likeButton.addEventListener('click', likesToggle ); //повесим слушатель на кнопку лайков   
};
initialCards.forEach(postingCard); //опубликуем первоначальный массив карточек




let popup = document.querySelector('.popup');
let formPopup = popup.querySelector('.popup__form');
let openPopupButton = document.querySelector('.profile__open-popup');
let closePopupButton = popup.querySelector('.popup__reset-button');
let nameInput = formPopup.popup__name;
let jobInput = formPopup.popup__specification;
let profileSpecification = document.querySelector('.profile__specification');
let profileName = document.querySelector('.profile__title');

function formOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileSpecification.textContent;
}
openPopupButton.addEventListener('click', formOpen);
function formClose() {
  popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', formClose);
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileSpecification.textContent = jobInput.value;
  formClose();
}
formPopup.addEventListener('submit', formSubmitHandler);
