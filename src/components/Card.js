export class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleBinClick }, templateSelector) {
    this._text = data.name;
    this._link = data.link;
    this._handleLikeClick = handleLikeClick;
    this._handleBinClick = handleBinClick;
    this._id = data._id;
    this._authorId = data.owner._id;
    this._likeAmount = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._likes = data.likes
    this._userId = data.userId
  }

  _getTemplate() {
    const cardElement = document.getElementById(this._templateSelector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteCardButton = this._element.querySelector('.place__trash-button');
    this._imageElement = this._element.querySelector('.place__img');
    this._likeButton.addEventListener('click', () => {

      this._handleLikeClick(this)
    });

    if (this._deleteCardButton){
    this._deleteCardButton.addEventListener('click', () => {
     // this.handleBinClick();
      console.log('fdgdfg')
    })};
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this);
    })
  }


  _toogleLikes() {
    this._element.querySelector('.place__like-amount').textContent = this._likes.length;

    if (this.hasLike()) {
      this._likeButton.classList.add('place__like-button_active');
    }
    else {
      this._likeButton.classList.remove('place__like-button_active');
    }
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._toogleLikes();
  }
  id() {
    return this._id;
  }

  hasLike() {
    let hasUserLike
    if (this._likes.length > 0) {
      hasUserLike = this._likes.some((el) => {
        return el._id === this._userId
      })
    }
    else {
      hasUserLike = false
    }
    return hasUserLike
  }

  _handDeleteCard() {
    this._deleteCardButton.closest('.place').remove();
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.place__img').src = this._link;
    this._element.querySelector('.place__paragraf').textContent = this._text;
    this._element.querySelector('.place__img').alt = `Фото пользователя: ${this._text}`;
    this._element.querySelector('.place__like-amount').textContent = this._likeAmount;

    if (this._authorId !== this._userId){this._deleteCardButton.remove()}
      
  
    this._toogleLikes()
    // Вернём элемент наружу
    return this._element;
  }
}