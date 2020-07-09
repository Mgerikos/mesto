const popup = document.querySelector('.popup')
const formElement = document.querySelector('.popup__form')
const popupOpenButton = document.querySelector('.profile__edit-btn')
const popupCloseButton = popup.querySelector('.popup__close-icon')
const submitButton = document.querySelector('.popup__btn_save')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_job')

let userName = document.querySelector('.profile__name')
let userJob = document.querySelector('.profile__job')

function popupToggle() {
    if (!popup.classList.contains('popup_opened')) {
      nameInput.value = userName.textContent;
      jobInput.value = userJob.textContent;
    }
popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    popupToggle();

}

formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)
