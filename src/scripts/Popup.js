
import { closeButtonSelector, openedPopupSelector } from './utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
  }

  _handleEscPress(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(openedPopupSelector);
    document.addEventListener('keydown', this._handleEscPress.bind(this));
  }

  close() {
    this._popup.classList.remove(openedPopupSelector);
    document.removeEventListener('keydown', this._handleEscPress.bind(this));
  }

  setEventListeners() {
    this._popup.addEventListener('pointerdown', (evt) => {
      this._overlay = document.querySelector(`.${openedPopupSelector}`);
      if ((evt.target === this._overlay) || (evt.target === this._closeButton)) {
        this.close();
      }
    })
  }
}

