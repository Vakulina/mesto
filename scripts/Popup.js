export default class Popup {
  constructor(popupSelector){
    this._popup=document.querySelector(popupSelector);
  }
  open(){}
  close(){}
 
  _handleEscPress (evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      console.log('close');
      closePopup(openedPopup);
    }
  }
  setEventListeners(){
    this._popup
  }
}
/*Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика
 иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.*/