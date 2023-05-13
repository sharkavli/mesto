const profileForm = document.querySelector('#formProfile');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active',
};

class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  //   enableValidation() {
  //     const formList = Array.from(document.querySelectorAll(this._formSelector));
  //     const formListtest = this._formElement;
  //     console.log(formList);
  //     console.log(formListtest);
  //     formList.forEach((formElement) => {
  //       this._setEventListeners(formElement);
  //       formElement.addEventListener('submit', function (evt) {
  //         evt.preventDefault();
  //         console.log(formElement);
  //       });
  //     });
  //   }

  enableValidation() {
    const formElement = this._formElement;
    this._setEventListeners(formElement);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(123);
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
}

const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();

export default FormValidator;
