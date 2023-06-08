import { data } from 'autoprefixer';

class Card {
  constructor(
    { data, handleCardClick, handeLikeClick, handeDeleteClick },
    templateSelector,
    userId
  ) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handeLikeClick;
    this._handeDeleteClick = handeDeleteClick;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._cardImage = this._element.querySelector('.element__photo');
    this._photoElement = this._element.querySelector('.element__photo');
    this._nameElement = this._element.querySelector('.element__name');
    this._likeCount = this._element.querySelector('.element__like-count');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._image, this._name);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handeDeleteClick();
      console.log(this._cardId);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this.isLiked());
    });
  }

  removeCard = () => {
    this._element.remove();
  };

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  toggleLike = (likes) => {
    this._likeButton.classList.toggle('element__like_active');
    this._likeCount.textContent = likes.length;
    this._likes = likes;
  };

  _toggleDeleteButtonVisability() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.classList.add('element__delete_inactive');
    }
  }

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
    this._toggleDeleteButtonVisability();
    if (this.isLiked()) {
      this._likeButton.classList.add('element__like_active');
    }

    this._likeCount.textContent = this._likes.length;
    this._photoElement.src = this._image;
    this._nameElement.textContent = this._name;
    this._photoElement.alt = this._name;
    return this._element;
  }
}

export default Card;
