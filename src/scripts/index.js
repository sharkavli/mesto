// **** ДИСКЛЕЙМЕР *****
// старый код оставлен намеренно, сделано это для того, чтобы в случае
// исправлений от ревью или ошибок я мог смотреть в старый код и не вспоминать или
// вообще писать функционал по-новой.
// я его удалю сразу же после сдачи
const initialCards = [
  {
    name: 'Патонг',
    link: 'https://cdn.discordapp.com/attachments/776893136277340190/1108417364434878594/patong.jpg',
  },
  {
    name: 'Хургада',
    link: 'https://cdn.discordapp.com/attachments/776893136277340190/1108416848984277033/khurgada.JPG',
  },
  {
    name: 'Каир',
    link: 'https://cdn.discordapp.com/attachments/776893136277340190/1108421366929170583/cairo.jpg',
  },
  {
    name: 'Анталья',
    link: 'https://cdn.discordapp.com/attachments/776893136277340190/1108420499198967870/antalya.jpg',
  },
  {
    name: 'Шарм-Эль-Шейх',
    link: 'https://cdn.discordapp.com/attachments/776893136277340190/1108420500318846986/sharm_el_sheikh.jpg',
  },
  {
    name: 'Алания',
    link: 'https://cdn.discordapp.com/attachments/776893136277340190/1108420499538722876/alanya.jpg',
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
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const openProfileButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('#formProfile');
const popupProfile = document.querySelector('#popupProfile');
const openAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popupAdd');
const formAdd = document.querySelector('#formAdd');
const cardImage = document.querySelector('#popupImg');
const elementList = document.querySelector('.elements');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__work');
const nameInput = document.querySelector('#inputName');
const aboutInput = document.querySelector('#inputWork');
//инстанс класса для профиля
const userInfo = new UserInfo({
  nameInfoElement: profileName,
  aboutInfoElement: profileAbout,
});
//инстанс класса для попапа добавления
const addInfo = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (data) => {
    // elementList.prepend(createCard(data));
    section.addItem(data);
  },
});
addInfo.setEventListeners();
//инстанс класса для попапа профиля
const profileInfo = new PopupWithForm({
  popupSelector: popupProfile,
  // handleFormSubmit: (data) => {
  //   elementList.prepend(createCard(data));
  // },
  handleFormSubmit: (input) => {
    const data = {
      name: input.name,
      link: input.link,
    };
    section.addItem(createCard(data));
  },
});
profileInfo.setEventListeners();
//кнопка открытия попапа профиля
openProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.userName;
  aboutInput.value = data.userAbout;
  profileInfo.open();
});
//кнопка открытия попапа добавления
openAddButton.addEventListener('click', () => {
  addValidation.disableButton();
  addInfo.open();
});
//отображение и открытие карточек
const popupCard = new PopupWithImage(cardImage);

const createCard = (cardData) => {
  const card = new Card(
    {
      data: cardData,
      handleCardClick: () => {
        popupCard.open(cardData);
      },
    },
    '#elements'
  );
  const cardElement = card.generateCard();
  return cardElement;
};

createCard({
  name: 'null',
  link: 'https://upload.wikimedia.org/wikipedia/commons/2/29/TashkentCity.jpg',
});
//отображение карточек из массива
const section = new Section(
  { items: initialCards, renderer: renderCard },
  elementList
);
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}
section.renderItems();
///включение валидации
const profileValidation = new FormValidator(validationConfig, formProfile);
const addValidation = new FormValidator(validationConfig, formAdd);
profileValidation.enableValidation();
addValidation.enableValidation();
