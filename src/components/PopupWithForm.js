import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._form = this._popupSelector.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      // console.log(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._form.reset();

    super.close();
  }

  open() {
    super.open();
  }
}
