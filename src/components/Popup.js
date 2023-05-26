export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector('.popup__close');
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close(this._popupElement);
      }
    });
  }
}
