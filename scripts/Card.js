

class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data, templateSelector) {
      // text и image — приватные поля, 
      // они нужны только внутри класса
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
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector('.place__img').src = this._link;
    this._element.querySelector('.place__paragraf').textContent = this._text;
    this._element.querySelector('.place__img').alt = `Фото пользователя: ${this._text}`
    // Вернём элемент наружу
    return this._element;
  }
}