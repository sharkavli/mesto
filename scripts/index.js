// **** ДИСКЛЕЙМЕР *****
// старый код оставлен намеренно, сделано это для того, чтобы в случае
// исправлений от ревью или ошибок я мог смотреть в старый код и не вспоминать или
// вообще писать функционал по-новой.
// я его удалю сразу же после сдачи
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active',
};
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const edit = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('#formProfile');
const nameEdit = document.querySelector('#inputName');
const workEdit = document.querySelector('#inputWork');
const popupProfile = document.querySelector('#popupProfile');
const visName = document.querySelector('.profile__name');
const visWork = document.querySelector('.profile__work');
const openAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popupAdd');
const formAdd = document.querySelector('#formAdd');
const popupImg = document.querySelector('#popupImg');
const closeButtons = document.querySelectorAll('.popup__close');
const elementList = document.querySelector('.elements');
const buttonSaveProfile = formProfile.querySelector('.popup__save');
const buttonSaveAdd = formAdd.querySelector('.popup__save');
//функции открытия и закрытия всех попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}
//кнопки открытия попапа профиля
edit.addEventListener('click', () => {
  profileValidation.disableButton();
  openPopup(popupProfile);
  nameEdit.value = visName.textContent;
  workEdit.value = visWork.textContent;
});
//кнопка сохранения попапа профиля
formProfile.addEventListener('submit', () => {
  visName.textContent = nameEdit.value;
  visWork.textContent = workEdit.value;
  closePopup(popupProfile);
  formProfile.reset();
});
//кнокпа открытия попапа добавления
openAdd.addEventListener('click', () => {
  addValidation.disableButton();
  openPopup(popupAdd);
});
//функция закрытие по всем крестикам
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});
//кнопка добавления карточки
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = Object.fromEntries(new FormData(evt.target));
  elementList.prepend(createCard(data));
  closePopup(popupAdd);
  formAdd.reset();
});
//отображение карточек из массива
const renderCards = () => {
  initialCards.forEach((item) => {
    elementList.append(createCard(item));
  });
};
renderCards();
function createCard(item) {
  const card = new Card(item, '#elements');
  const cardElement = card.generateCard();
  return cardElement;
}
///включение валидации
const profileValidation = new FormValidator(validationConfig, formProfile);
const addValidation = new FormValidator(validationConfig, formAdd);
profileValidation.enableValidation();
addValidation.enableValidation();
//закрытие кнопкой esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
// закрытие нажатаем на оверлей
function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
popupAdd.addEventListener('click', handleOverlay);
popupProfile.addEventListener('click', handleOverlay);
popupImg.addEventListener('click', handleOverlay);
