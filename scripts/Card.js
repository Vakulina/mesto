

class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data, templateSelector) {
      this._text = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
}
  _getTemplate() {
     // забираем разметку из HTML и клонируем элемент
    const cardElement= document.getElementById(this._templateSelector).content.querySelector('.place').cloneNode(true);
     // вернём DOM-элемент карточки
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteCardButton = this._element.querySelector('.place__trash-button');
    this._likeButton.addEventListener('click', ()=> {
      this._handletoggleLike();
    });
    this._deleteCardButton.addEventListener('click', () =>{
      this._handDeleteCard();
    });
  }

  _handletoggleLike() {
    this._likeButton.classList.toggle('place__like-button_active');
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
    
    // Вернём элемент наружу
    return this._element;
  }
}




