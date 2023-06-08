// **** ДИСКЛЕЙМЕР *****
// старый код оставлен намеренно, сделано это для того, чтобы в случае
// исправлений от ревью или ошибок я мог смотреть в старый код и не вспоминать или
// вообще писать функционал по-новой.
// я его удалю сразу же после сдачи
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { data } from 'autoprefixer';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active',
};

const openProfileButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('#formProfile');
const popupProfile = document.querySelector('#popupProfile');
const openAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popupAdd');
const formAdd = document.querySelector('#formAdd');
const cardImage = document.querySelector('#popupImg');
const deletePopup = document.querySelector('#popupDelete');
const elementList = document.querySelector('.elements');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__work');
const profileAvatar = document.querySelector('.profile__avatar');
const nameInput = document.querySelector('#inputName');
const aboutInput = document.querySelector('#inputWork');
const popupAvatar = document.querySelector('#popupEditAvatar');
const avatarButton = document.querySelector('.profile__edit-avatar');
const formAvatar = document.querySelector('#formAvatar');

let userId = null;
//запрос на информацию об имени и карточках
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '72fd51b5-c68d-42a2-ab30-c6fba5415244',
    'Content-Type': 'application/json',
  },
});
//рендер запроса и отображение актуальных имени и карточек
Promise.all([api.getProfileInfo(), api.getCardsInfo()])
  .then((data) => {
    userId = data[0]._id;
    userInfo.setUserInfo(data[0]);
    const reverseCards = data[1].reverse();
    section.renderItems(reverseCards);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });
//функция замены текста на загрузку
function loadingText(form, text) {
  const button = form.querySelector('.popup__save');
  button.textContent = text;
}
//установка нового аватара профиля
function setNewAvatar(data) {
  loadingText(formAvatar, 'Сохранение...');
  api
    .setNewAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupSetAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingText(formAvatar, 'Сохранить');
    });
}
//установка новых данных профиля для последующей отправки данных на сервер
function setNewUserInfo(data) {
  loadingText(formProfile, 'Сохранение...');
  api
    .setProfileEdit(data)
    .then((data) => {
      popupEditProfile.close();
      userInfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingText(formProfile, 'Сохранить');
    });
}
//добавление новых карточек для отправки их на сервер
function postNewCard(data) {
  loadingText(formAdd, 'Сохранение...');
  api
    .setNewCard(data)
    .then((data) => {
      popupAddCard.close();
      section.addItem(createCard(data));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingText(formAdd, 'Сохранить');
    });
}
//инстанс класса для профиля
const userInfo = new UserInfo({
  nameInfoElement: profileName,
  aboutInfoElement: profileAbout,
  avaratInfoElement: profileAvatar,
});
//инстанс класса для попапа аватара
const popupSetAvatar = new PopupWithForm({
  popupElement: popupAvatar,
  handleFormSubmit: (data) => {
    setNewAvatar(data);
  },
});
popupSetAvatar.setEventListeners();
//инстанс класса для попапа добавления
const popupAddCard = new PopupWithForm({
  popupElement: popupAdd,
  handleFormSubmit: (data) => {
    postNewCard(data);
  },
});
popupAddCard.setEventListeners();
//инстанс класса для попапа профиля
const popupEditProfile = new PopupWithForm({
  popupElement: popupProfile,
  handleFormSubmit: (data) => {
    setNewUserInfo(data);
  },
});
popupEditProfile.setEventListeners();
//кнопка открытия попапа аватара
avatarButton.addEventListener('click', () => {
  avatarValidation.disableButton();
  popupSetAvatar.open();
});
//кнопка открытия попапа профиля
openProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.userName;
  aboutInput.value = data.userAbout;
  popupEditProfile.open();
});
//кнопка открытия попапа добавления
openAddButton.addEventListener('click', () => {
  addValidation.disableButton();
  popupAddCard.open();
});
//инстанс класса попапа удаления
const popupDelete = new PopupWithDelete(deletePopup, {
  deleteCard: (cardId) =>
    api.deleteCard(cardId).catch((err) => console.log(err)),
});
//отображение и открытие карточек
const popupCard = new PopupWithImage(cardImage);
popupCard.setEventListeners();
function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        popupCard.open(data);
      },
      handeLikeClick: (cardId, isLiked) => {
        api.toggleLike(cardId, isLiked).then((data) => {
          card.toggleLike(data.likes).catch((err) => console.log(err));
        });
      },
      handeDeleteClick: () => {
        popupDelete.open(card);
        popupDelete.setEventListeners();
      },
    },
    '#elements',
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}
//отображение карточек из массива
//const section = new Section({ renderer: renderCard }, elementList); - было так 1.0
const section = new Section(renderCard, elementList);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}
///включение валидации
const profileValidation = new FormValidator(validationConfig, formProfile);
const addValidation = new FormValidator(validationConfig, formAdd);
const avatarValidation = new FormValidator(validationConfig, formAvatar);
profileValidation.enableValidation();
addValidation.enableValidation();
avatarValidation.enableValidation();
