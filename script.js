let edit = document.querySelector('.profile__edit-button');
let close = document.querySelector('.popup__close');
let save = document.querySelector('.popup__save');
let nameEdit = document.querySelector('.popup__name');
let workEdit = document.querySelector('.popup__work');
let popup = document.querySelector('.popup');
let visName = document.querySelector('.profile__name');
let visWork = document.querySelector('.profile__work');
let like = document.querySelectorAll('.element__like')
let backgroundOfPopup = document.querySelector('.popup')

nameEdit.value = visName.textContent
workEdit.value = visWork.textContent

edit.addEventListener('click', openEditForm)

function openEditForm() {
    popup.classList.add("popup__opened")
}

close.addEventListener('click', closeEditForm)

function closeEditForm() {
    popup.classList.remove("popup__opened")
}

save.addEventListener('click', saveEdit)

function saveEdit() {
    if (nameEdit.value.length === 0 || workEdit.value.length === 0) {
        alert('Введите имя и род деятельности!')
    } else {
        visName.textContent = nameEdit.value
        visWork.textContent = workEdit.value
        popup.classList.remove("popup__opened")
    }
}