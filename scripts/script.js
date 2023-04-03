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
const popupAdd = document.querySelector('#popupAdd');
const saveAdd = document.querySelector('#saveAdd');
const titleEdit = document.querySelector('#inputTitle');
const linkEdit = document.querySelector('#inputLink');
const formAdd = document.querySelector('#formAdd');
const popupImg = document.querySelector('.popup__img');
const popupImage = document.querySelector('.popup__image');
const closeImg = document.querySelector('#closeImg');
const popupBottomText = document.querySelector('.popup__text')

function newCard(item) {
const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
const cardImage = cardElements.querySelector('.element__photo');
const cardName = cardElements.querySelector('.element__name');
const deleteEl = cardElements.querySelector('.element__delete')
// закрытие и открытие картинки
closeImg.addEventListener('click', (closePhoto) => {
  popupImg.classList.remove("popup_opened");
})

cardImage.addEventListener('click', function() {
  popupImg.classList.add("popup_opened");
  popupImage.setAttribute('src', cardImage.src)
  popupBottomText.textContent = cardName.textContent;
})
// лайк
cardElements.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});
// удаление карточки
deleteEl.addEventListener('click', function () {
  const listEl = deleteEl.closest('.element');
  listEl.remove();
}); 


    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardName.textContent = item.name;

    return cardElements;

}

initialCards.forEach(function(item) {
    const createCard = newCard(item);
    cardsSection.append(createCard);
})



/// создание карточки

formAdd.addEventListener('submit', (addCard)=>{
  addCard.preventDefault();
  const cardElements = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElements.querySelector('.element__photo');
  const cardName = cardElements.querySelector('.element__name');
  const deleteEl = cardElements.querySelector('.element__delete')
  
  deleteEl.addEventListener('click', function () {
    const listEl = deleteEl.closest('.element');
    listEl.remove();
  }); 
  
  cardName.textContent = titleEdit.value;
  cardImage.src = linkEdit.value;

  // лайк
  cardElements.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
  });

  // закрытие и открыте картинки

  closeImg.addEventListener('click', (closePhoto) => {
    popupImg.classList.remove("popup_opened");
  })
  
  cardImage.addEventListener('click', function() {
    popupImg.classList.add("popup_opened");
    popupImage.setAttribute('src', cardImage.src)
    popupBottomText.textContent = cardName.textContent;    
  })

  closeAddForm();

  cardsSection.prepend(cardElements);
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

// открытие и закрытие добавления карточки

function openAddForm() {
  popupAdd.classList.add("popup_opened");
}
openAdd.addEventListener('click', openAddForm)

function closeAddForm() {
  popupAdd.classList.remove("popup_opened")
}
closeAdd.addEventListener('click', closeAddForm);

// function deleteElement() {
//   const listEl = deleteEl.closest('.element');
//   listEl.remove()
//   console.log(`button is pressed`);
// }

// deleteEl.addEventListener('click', deleteElement);

// выберем кнопку удаления
// const deleteButton = document.querySelector('.todo__item-button');

// добавим обработчик


// deleteEl.addEventListener('click')