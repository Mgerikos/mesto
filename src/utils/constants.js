export const initialCards = [
  {
      name: 'winter kiss',
      link: 'https://drscdn.500px.org/photo/1019942334/m%3D900/v2?sig=08cf7014d13ee4c4f083a2d7e92311466d38801ead66339ecfee80ba8aef2327'
  },
  {
      name: 'tired and lay down',
      link: 'https://drscdn.500px.org/photo/231337729/m%3D900/v2?sig=13a8177959bebab0c672dd932927d051da742d7560c7760a7dba7a5546a6a544'
  },
  {
      name: 'the harvest time',
      link: 'https://drscdn.500px.org/photo/1019942336/m%3D900/v2?sig=f5a2b0b96250f157808810ce5b3002622b787d3ec116b993ee8a853d335eb6cf'
  },
  {
      name: 'passionate dance',
      link: 'https://drscdn.500px.org/photo/1019942335/m%3D900/v2?sig=81e35631d855007b9f96842169c3e291d7da275b0bbff62db87d7a7f97b19c87'
  },
  {
      name: 'my love',
      link: 'https://drscdn.500px.org/photo/1019942224/m%3D900/v2?sig=8e1bc6668f9a3668fd37d47af5796de68cedd811ab7e5726397f469e6c19ba3b'
  },
  {
      name: 'armenian mountains with some clothes',
      link: 'https://drscdn.500px.org/photo/231338159/m%3D900/v2?sig=582bad932c4fd450c3418e8ba7297280bfa5586213ac9558f1abdc95f9217b10'
  }
];
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const formProfileElement = document.querySelector('.popup__form_profile');
export const nameInput = formProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileElement.querySelector('.popup__input_type_job');
export const cards = document.querySelector('.cards');
export const formElementCards = document.querySelector('.popup__form_cards');
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
