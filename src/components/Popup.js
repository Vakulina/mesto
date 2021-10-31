
import { closeButtonSelector, openedPopupSelector } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._handleEscPress=this._handleEscPress.bind(this)
  }

  _handleEscPress(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(openedPopupSelector);
    document.addEventListener('keydown', this._handleEscPress);
  }

  close() {
    this._popup.classList.remove(openedPopupSelector);
    document.removeEventListener('keydown', this._handleEscPress);
  }

  setEventListeners() {
    this._popup.addEventListener('pointerdown', (evt) => {
      
      if ((evt.target === this._popup) || (evt.target === this._closeButton)) {
        this.close();
      }
    })
  }

}

