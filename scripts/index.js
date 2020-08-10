

//поменял весь код после втрого ревью, оставив комментарии.

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

//card's variables
const cardBlock = document.querySelector('.cards');
const cardTemplate = document.querySelector('.template-card').content;

//full-Picture name and image
const popupPictureTitle = popupFullPicture.querySelector('.popup__title_type_full-pic');
const popupPictureImg = popupFullPicture.querySelector('.popup__full-pic');

//Overlay
const popupOverlays = document.querySelectorAll('.popup');



//Creating Cards
const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards__title').textContent = data.name;
  cardElement.querySelector('.cards__img').src = data.link;
  cardElement.querySelector('.cards__img').alt = data.name;

  cardElement.querySelector('.cards__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.cards__element').remove();
  })
  cardElement.querySelector('.cards__hearth-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__hearth-button_active');
  });
  cardElement.querySelector('.cards__img').addEventListener('click', function (evt) {
    handlePreviewPhoto(data.name, data.link);
  });

  return cardElement;
}

//rendering cards
const renderCard = (data) => cardBlock.prepend(createCard(data));


const renderCards = (cards) => {
  cards.forEach(el => cardBlock.append(createCard(el)));
}
renderCards(initialCards);

//Full-picture opening function
const handlePreviewPhoto = (name, link) => {
  popupPictureTitle.textContent = name;
  popupPictureImg.src = link;
  popupPictureImg.alt = name;

  openPopupItem(popupFullPicture);
};


const openPopupEdit = () => {
  openPopupItem(popupEdit);

  inputNameEdit.value = profileName.textContent;
  inputJobEdit.value = profileJob.textContent;

  resetForms(popupEditForm)
  disableBtn(popupEditForm);
};


const openPopupAdd = () => {
  openPopupItem(popupAdd);
  popupAddForm.reset();
  resetForms(popupAddForm);
  disableBtn(popupAddForm);
};

//forms saving function
const submitPopupFormEdit = (event) => {

  profileName.textContent = inputNameEdit.value;
  profileJob.textContent = inputJobEdit.value;

  closePopupItem(popupEdit);
};

//save the card
const submitPopupFormAdd = (event) => {
  renderCard({ name: inputNameAdd.value, link: inputLinkAdd.value });
  closePopupItem(popupAdd);
};

//send the form
popupEditForm.addEventListener('submit', submitPopupFormEdit);
popupAddForm.addEventListener('submit', submitPopupFormAdd);

//popup close
popupEditClose.addEventListener('click', () => closePopupItem(popupEdit));
popupAddClose.addEventListener('click', () => closePopupItem(popupAdd));
popupFullPictureClose.addEventListener('click', () => closePopupItem(popupFullPicture));

//popup open
editPopupButton.addEventListener('click', openPopupEdit);
addPopupButton.addEventListener('click', openPopupAdd);


//close popup by esc
function handleEscKeydown(event) {
  const openPopup = document.querySelector('.popup_opened');
  if (event.key == 'Escape' && openPopup) {
    closePopupItem(openPopup);
  }
}

//popup opening function
const openPopupItem = (PopupWindow) => {
  PopupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKeydown);
}

//popup closing function
const closePopupItem = (PopupWindow) => {
  PopupWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKeydown);

}

//close popup by overlay
popupOverlays.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopupItem(evt.target);
    };
  })
});


