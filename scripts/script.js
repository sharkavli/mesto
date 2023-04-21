const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cardsSection = document.querySelector('.elements')
const cardsTemplate = document.querySelector('#elements').content;
const edit = document.querySelector('.profile__edit-button');
const closeProfile = document.querySelector('#closeProfile');
const closeAdd = document.querySelector('#closeAdd')
const formProfile = document.querySelector('#formProfile');
const nameEdit = document.querySelector('#inputName');
const workEdit = document.querySelector('#inputWork');
const popupProfile = document.querySelector('#popupProfile');
const visName = document.querySelector('.profile__name');
const visWork = document.querySelector('.profile__work');
const openAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('#popupAdd');
const titleEdit = document.querySelector('#inputTitle');
const linkEdit = document.querySelector('#inputLink');
const formAdd = document.querySelector('#formAdd');
const popupImg = document.querySelector('#popupImg');
const popupImage = document.querySelector('.popup__image');
const closeImg = document.querySelector('#closeImg');
const popupBottomText = document.querySelector('.popup__text');
const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
const cardImage = cardElements.querySelector('.element__photo');
const cardName = cardElements.querySelector('.element__name');
const deleteEl = cardElements.querySelector('.element__delete')
const closeButtons = document.querySelectorAll('.popup__close');
const page = document.querySelector('.page');
//проверка кнопки
function offButton() {
  const buttons = document.querySelectorAll('.popup__save');
  buttons.forEach((button) => {
      button.classList.add('popup__save_inactive');
  })
}
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
edit.addEventListener('click', ()=>{
  openPopup(popupProfile)
  nameEdit.value = visName.textContent;
  workEdit.value = visWork.textContent;
});
//кнопка сохранения попапа профиля
formProfile.addEventListener('submit', (saveEdit)=>{
  // saveEdit.preventDefault();
  visName.textContent = nameEdit.value;
  visWork.textContent = workEdit.value;
  closePopup(popupProfile);
});
//кнокпа открытия попапа добавления
openAdd.addEventListener('click', ()=>{
  openPopup(popupAdd);
  offButton();
})
//открытие картинки
cardImage.addEventListener('click', ()=>{
  openPopup(popupImg);
  popupImage.setAttribute('src', cardImage.src);
  popupBottomText.textContent = cardName.textContent;
})
//функция закрытие по всем крестикам
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});
//карточки из массива
function newCard(item) {
  const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElements.querySelector('.element__photo');
  const cardName = cardElements.querySelector('.element__name');
  const deleteEl = cardElements.querySelector('.element__delete');
//открытие картинки
cardImage.addEventListener('click', ()=>{
  openPopup(popupImg);
  popupImage.setAttribute('src', cardImage.src);
  popupImage.alt = cardName.textContent;
  popupBottomText.textContent = cardName.textContent;
})
//лайк
  cardElements.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
//удаление карточки
deleteEl.addEventListener('click', function () {
  const listEl = deleteEl.closest('.element');
  listEl.remove();
}); 
//присвоение картинок на страницу из массива
cardImage.src = item.link;
cardImage.alt = item.name;
cardName.textContent = item.name;
return cardElements;
}
//перебор массива
initialCards.forEach(function(item) {
  const createCard = newCard(item);
  cardsSection.append(createCard);
})
//добавление новых карточек
function handleSubmit(item) {
  // item.preventDefault();
  item = {
    link: inputLink.value, 
    name: inputTitle.value 
  }
  const card = newCard(item)
  cardsSection.prepend(card);
  closePopup(popupAdd);
  formAdd.reset();
}
//кнопка добавления карточки
formAdd.addEventListener('submit', handleSubmit)
//закрытие кнопкой esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
popupAdd.addEventListener('click', handleOverlay);
popupProfile.addEventListener('click', handleOverlay);
popupImg.addEventListener('click', handleOverlay);