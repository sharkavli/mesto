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
const close = document.querySelector('.popup__close');
const closeAdd = document.querySelector('#closeAdd')
const form = document.querySelector('.popup__form');
const nameEdit = document.querySelector('#inputName');
const workEdit = document.querySelector('#inputWork');
const popup = document.querySelector('.popup');
const visName = document.querySelector('.profile__name');
const visWork = document.querySelector('.profile__work');
const openAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup__add');
const saveAdd = document.querySelector('#saveAdd')
const titleEdit = document.querySelector('#inputTitle')
const linkEdit = document.querySelector('#inputLink')
// const buttonLike = cardElements.querySelector('.element__set-like')


function newCard(item) {
const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
const cardImage = cardElements.querySelector('.element__photo');
const cardName = cardElements.querySelector('.element__name');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardName.textContent = item.name;
    // cardsSection.append(cardElements);

    return cardElements;
}

initialCards.forEach(function(item) {
    const createCard = newCard(item);
    cardsSection.append(createCard);
})

// function addCard() {
//   const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
//   const cardImage = cardElements.querySelector('.element__photo');
//   const cardName = cardElements.querySelector('.element__name');
  
//   cardName.textContent = titleEdit.value
//   cardImage.src = linkEdit.value

//   closeAddForm();

//   cardsSection.append(cardElements);

//   addCard.preventDefault();

//   console.log(titleEdit.value)
//   console.log(linkEdit.value)
// }

// saveAdd.addEventListener('click', addCard);

saveAdd.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElements.querySelector('.element__photo');
  const cardName = cardElements.querySelector('.element__name');
  
  cardName.textContent = titleEdit.value;
  cardImage.src = linkEdit.value;

  closeAddForm();

  cardsSection.append(cardElements);

  console.log(titleEdit.value);
  console.log(linkEdit.value);
})

// изменение имени и работы

function openEditForm() {
    popup.classList.add("popup_opened")
    nameEdit.value = visName.textContent
    workEdit.value = visWork.textContent
}
edit.addEventListener('click', openEditForm)

function closeEditForm() {
    popup.classList.remove("popup_opened")
}
close.addEventListener('click', closeEditForm)

form.addEventListener('submit', (saveEdit)=>{
    saveEdit.preventDefault();
    visName.textContent = nameEdit.value;
    visWork.textContent = workEdit.value;
    closeEditForm();
});

// открытие и закрытие добавление карточки

function openAddForm() {
  popupAdd.classList.add("popup_opened");
}
openAdd.addEventListener('click', openAddForm)

function closeAddForm() {
  popupAdd.classList.remove("popup_opened")
}
closeAdd.addEventListener('click', closeAddForm);
