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

const popupImage = document.querySelector('.popup__image');
const popupBottomText = document.querySelector('.popup__text');
const closeImage = document.querySelector('#closeImg');
// const cardsSection = document.querySelector('.elements');
// const cardsTemplate = document.querySelector('#elements').content;
const edit = document.querySelector('.profile__edit-button');
// const closeProfile = document.querySelector('#closeProfile');
// const closeAdd = document.querySelector('#closeAdd');
const formProfile = document.querySelector('#formProfile');
const nameEdit = document.querySelector('#inputName');
const workEdit = document.querySelector('#inputWork');
const popupProfile = document.querySelector('#popupProfile');
const visName = document.querySelector('.profile__name');
const visWork = document.querySelector('.profile__work');
const openAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popupAdd');
// const titleEdit = document.querySelector('#inputTitle');
// const linkEdit = document.querySelector('#inputLink');
const formAdd = document.querySelector('#formAdd');
const popupImg = document.querySelector('#popupImg');
// const popupImage = document.querySelector('.popup__image');
// const closeImg = document.querySelector('#closeImg');
// const popupBottomText = document.querySelector('.popup__text');
// const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
// const cardImage = cardElements.querySelector('.element__photo');
// const cardName = cardElements.querySelector('.element__name');
// const deleteEl = cardElements.querySelector('.element__delete');
const closeButtons = document.querySelectorAll('.popup__close');
const elementList = document.querySelector('.elements');
//проверка кнопки
const disableButton = (form, button) => {
  const inputs = form.querySelectorAll('.popup__input');
  const arrInputs = Array.from(inputs);
  arrInputs.forEach((input) => {
    if (!input.validity.valid) {
      button.classList.add('popup__save_inactive');
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove('popup__save_inactive');
      button.removeAttribute('disabled', true);
    }
  });
};
//функции открытия и закрытия всех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}
//кнопки открытия попапа профиля
edit.addEventListener('click', () => {
  const button = popupProfile.querySelector('.popup__save');
  disableButton(popupProfile, button);
  openPopup(popupProfile);
  // nameEdit.value = visName.textContent;
  // workEdit.value = visWork.textContent;
});
//кнопка сохранения попапа профиля
formProfile.addEventListener('submit', (saveEdit) => {
  // saveEdit.preventDefault();
  visName.textContent = nameEdit.value;
  visWork.textContent = workEdit.value;
  closePopup(popupProfile);
  formProfile.reset();
});
//кнокпа открытия попапа добавления
openAdd.addEventListener('click', () => {
  const button = popupProfile.querySelector('.popup__save');
  openPopup(popupAdd);
  disableButton(popupProfile, button);
});
//функция закрытие по всем крестикам
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});
//карточки из массива
// function addCard(item) {
//   const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
//   const cardImage = cardElements.querySelector('.element__photo');
//   const cardName = cardElements.querySelector('.element__name');
//   const deleteEl = cardElements.querySelector('.element__delete');
//   //открытие картинки
//   cardImage.addEventListener('click', () => {
//     openPopup(popupImg);
//     popupImage.setAttribute('src', cardImage.src);
//     popupImage.alt = cardName.textContent;
//     popupBottomText.textContent = cardName.textContent;
//   });
//   //лайк
//   cardElements
//     .querySelector('.element__like')
//     .addEventListener('click', function (evt) {
//       evt.target.classList.toggle('element__like_active');
//     });
//   //удаление карточки
//   deleteEl.addEventListener('click', function () {
//     const listEl = deleteEl.closest('.element');
//     listEl.remove();
//   });
//   //присвоение картинок на страницу из массива
//   cardImage.src = item.link;
//   cardImage.alt = item.name;
//   cardName.textContent = item.name;
//   return cardElements;
// }
// //перебор массива
// initialCards.forEach(function (item) {
//   const createCard = addCard(item);
//   cardsSection.append(createCard);
// });
// //добавление новых карточек
// function handleCardFormSubmit() {
//   // item.preventDefault();
//   const item = {
//     link: inputLink.value,
//     name: inputTitle.value,
//   };
//   const card = addCard(item);
//   cardsSection.prepend(card);
//   closePopup(popupAdd);
//   formAdd.reset();
// }
//кнопка добавления карточки
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = Object.fromEntries(new FormData(evt.target));
  const card = new Card(data, '#elements');
  const cardElement = card.generateCard();
  elementList.prepend(cardElement);
  closePopup(popupAdd);
  formAdd.reset();
});
//отображение карточек из массива
const renderCards = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '#elements');
    const cardElement = card.generateCard();
    elementList.append(cardElement);
  });
};
renderCards();
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
