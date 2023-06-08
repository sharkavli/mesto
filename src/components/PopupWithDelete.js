import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupElement, { deleteCard }) {
    super(popupElement);

    this._confirmButton = this._popupElement.querySelector('.popup__save');
    this.deleteCard = deleteCard;
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this.deleteCard(this.card._cardId);
      this.card.removeCard();
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._confirmButton.textContent = 'Удаление..';

    super.close();
  }

  open(card) {
    this._confirmButton.textContent = 'Да';
    this.card = card;

    super.open();
  }
}
