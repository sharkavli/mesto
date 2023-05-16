const popupImg = document.querySelector('#popupImg');
const popupImage = document.querySelector('.popup__image');
const popupBottomText = document.querySelector('.popup__text');
import { openPopup, closePopup } from './index.js';

class Card {
  constructor(item, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = item.link;
    this._name = item.name;
    this._openPopupFunction = openPopup;
    this._closePopupFunction = closePopup;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._cardImage = this._element.querySelector('.element__photo');

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    });

    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
  }

  _handleOpenPopup() {
    this._openPopupFunction(popupImg);
    popupImage.setAttribute('src', this._image);
    popupImage.alt = this._name;
    popupBottomText.textContent = this._name;
  }

  _removeCard() {
    this._element.remove();
  }

  _toggleLike = () => {
    this._likeButton.classList.toggle('element__like_active');
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this._image;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__photo').alt = this._name;
    return this._element;
  }
}

export default Card;
