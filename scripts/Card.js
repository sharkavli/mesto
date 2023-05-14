const popupImg = document.querySelector('#popupImg');
const popupImage = document.querySelector('.popup__image');
const popupBottomText = document.querySelector('.popup__text');
const closeImage = document.querySelector('#closeImg');
import { openPopup, closePopup } from './index.js';
class Card {
  constructor(item, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = item.link;
    this._name = item.name;
    this._openPopupFunction = openPopup;
    this._closePopupFunction = closePopup;
  }

  _handleOpenPopup() {
    // document.addEventListener('keydown', this._handleEscape);
    this._openPopupFunction(popupImg);
    // console.log(this._openPopupFunction);
    // popupImg.classList.add('popup_opened');
    popupImage.setAttribute('src', this._image);
    popupImage.alt = this._name;
    popupBottomText.textContent = this._name;
  }

  //   _handleClosePopup() {
  //     popupImg.classList.remove('popup_opened');
  //     document.removeEventListener('keydown', this._handleEscape);
  //   }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like');
    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        this._handleOpenPopup();
      });

    // closeImage.addEventListener('click', () => {
    //   this._closePopupFunction;
    // });

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._removeCard();
      });
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active');
    });
  }

  //   _handleEscape(evt) {
  //     if (evt.key === 'Escape') {
  //       popupImg.classList.remove('popup_opened');
  //       document.removeEventListener('keydown', this._handleEscape);
  //     }
  //   }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  //   _setLike() {
  //     this._element
  //       .querySelector('.element__like')
  //       .classList.toggle('element__like_active');
  //   }

  _removeCard() {
    this._element.remove();
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
