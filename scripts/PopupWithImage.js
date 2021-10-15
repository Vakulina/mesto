import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__large-image');
    this._text = this._popup.querySelector('.popup__subtitle');
 }
 open(link, name, alt){
  this._image.src = link;
  this._text.textContent = name;
  this._image.alt = alt;
super.open();
 }

}


/*
const pop= new PopupWithImage( {
  name: 'Байкал',
  link: './images/Baikal.jpg'
}, imageSelector);
pop.open()*/