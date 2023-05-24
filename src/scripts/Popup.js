export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupSelector.querySelector('.popup__close');
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}
