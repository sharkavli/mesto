let edit = document.querySelector('.profile__edit-button');
let close = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let nameEdit = document.querySelector('#inputName');
let workEdit = document.querySelector('#inputWork');
let popup = document.querySelector('.popup');
let visName = document.querySelector('.profile__name');
let visWork = document.querySelector('.profile__work');

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


// function saveEdit() {
//     saveEdit.preventDefault();
//     visName.textContent = nameEdit.value;
//     visWork.textContent = workEdit.value;
//     closeEditForm();
// }
// form.addEventListener('submit', saveEdit)