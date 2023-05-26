import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);

    this._popupImage = document.querySelector('.popup__image');
    this._popupImageBottomText = document.querySelector('.popup__text');
  }

  open(data) {
    this._name = data.name;
    this._link = data.link;
    this._popupImage.src = this._link;
    this._popupImageBottomText.textContent = this._name;
    this._popupImage.alt = this._name;

    super.open();
  }
}
