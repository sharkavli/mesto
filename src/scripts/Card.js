class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._cardImage = this._element.querySelector('.element__photo');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._image, this._name);
    });

    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    });

    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
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
