import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { openPopupItem, closePopupItem } from './utils.js';


//massivs
const initialCards = [
  {
      name: 'Winter kiss',
      link: 'https://drscdn.500px.org/photo/1019942334/m%3D900/v2?sig=08cf7014d13ee4c4f083a2d7e92311466d38801ead66339ecfee80ba8aef2327'
  },
  {
      name: 'Tired and lay down',
      link: 'https://drscdn.500px.org/photo/231337729/m%3D900/v2?sig=13a8177959bebab0c672dd932927d051da742d7560c7760a7dba7a5546a6a544'
  },
  {
      name: 'The harvest time',
      link: 'https://drscdn.500px.org/photo/1019942336/m%3D900/v2?sig=f5a2b0b96250f157808810ce5b3002622b787d3ec116b993ee8a853d335eb6cf'
  },
  {
      name: 'Passionate dance',
      link: 'https://drscdn.500px.org/photo/1019942335/m%3D900/v2?sig=81e35631d855007b9f96842169c3e291d7da275b0bbff62db87d7a7f97b19c87'
  },
  {
    name: 'My love',
    link: 'https://drscdn.500px.org/photo/1019942224/m%3D900/v2?sig=8e1bc6668f9a3668fd37d47af5796de68cedd811ab7e5726397f469e6c19ba3b'
},
  {
      name: 'Armenian mountains with some clothes',
      link: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/59730715_621666404911287_1510945369901498368_n.jpg?_nc_cat=100&_nc_sid=0be424&_nc_ohc=7k9aqAC6vzcAX8FGFQs&_nc_ht=scontent-arn2-2.xx&oh=b8e2b812352ffab471a42f6000909a94&oe=5F454585'
  }
];


//Variables

//edit and add buttons
const editPopupButton = document.querySelector('.profile__edit-btn');
const addPopupButton = document.querySelector('.profile__add-btn');

//edit, add and fullpic popups
const popupEdit = document.querySelector('.popup_edit-profile');
const popupAdd = document.querySelector('.popup_add-new-card');
const popupFullPicture = document.querySelector('.popup_type_full-pic');

//close buttons
const popupEditClose = popupEdit.querySelector('.popup__close-icon');
const popupAddClose = popupAdd.querySelector('.popup__close-icon');
const popupFullPictureClose = popupFullPicture.querySelector('.popup__close-icon');

//forms
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupAddForm = popupAdd.querySelector('.popup__form');

//add and edit inputs
const inputNameEdit = popupEdit.querySelector('.popup__input_type_name');
const inputJobEdit = popupEdit.querySelector('.popup__input_type_job');
const inputNameAdd = popupAdd.querySelector('.popup__input_type_title ');
const inputLinkAdd = popupAdd.querySelector('.popup__input_type_url');

//about profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Overlay
const popupOverlays = document.querySelectorAll('.popup');

//card's variable and template
const cardBlock = document.querySelector('.cards');
const cardTemplate = document.querySelector('.template-card');



const formArrValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input_type_error',
  submitBtnSelector: '.popup__submit',
  inactiveBtnClass: 'popup__submit_disabled'
}


initialCards.forEach((data) => {
  const card = new Card(data, cardTemplate);
  cardBlock.append(card.getView());
});

//addform validation
const validateFormAdd = new FormValidator(formArrValidate);
validateFormAdd.enableValidation();

//edit form validation
const validateFormEdit = new FormValidator(formArrValidate);
validateFormEdit.enableValidation();


//popup closing by overlay
popupOverlays.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopupItem(evt.target);
    }
  })
});

//form return function
const openPopupEdit = () => {
  openPopupItem(popupEdit);

  inputNameEdit.value = profileName.textContent;
  inputJobEdit.value = profileJob.textContent;

  validateFormEdit.resetForms(popupEditForm);
  validateFormEdit.disableBtn(popupEditForm);
};

//form opening and adding an image
const openPopupAdd = () => {
  openPopupItem(popupAdd);
  popupAddForm.reset();

  validateFormAdd.resetForms(popupAddForm);
  validateFormAdd.disableBtn(popupAddForm);
};

//form saving function
const submitPopupFormEdit = (event) => {
  profileName.textContent = inputNameEdit.value;
  profileJob.textContent = inputJobEdit.value;

  closePopupItem(popupEdit);
};

//card saving
const submitPopupFormAdd = (event) => {
  const newCardItem = new Card({ name: inputNameAdd.value, link: inputLinkAdd.value }, cardTemplate).getView();
  cardBlock.prepend(newCardItem);
  closePopupItem(popupAdd);
};

//form sending
popupEditForm.addEventListener('submit', submitPopupFormEdit);
popupAddForm.addEventListener('submit', submitPopupFormAdd);

//popup closing by close-icon
popupEditClose.addEventListener('click', () => closePopupItem(popupEdit));
popupAddClose.addEventListener('click', () => closePopupItem(popupAdd));
popupFullPictureClose.addEventListener('click', () => closePopupItem(popupFullPicture));

//popup opening
editPopupButton.addEventListener('click', openPopupEdit);
addPopupButton.addEventListener('click', openPopupAdd);




