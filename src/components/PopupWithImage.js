import Popup from './Popup.js';
import { largeImageSelector, popupSumtitleSelector } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(largeImageSelector);
    this._text = this._popup.querySelector(popupSumtitleSelector);
  }
  open(link, place, alt) {
    this._image.src = link;
    this._text.textContent = place;
    this._image.alt = alt;
    super.open();
  }
}