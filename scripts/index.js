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

//finding variables

// edit, add and fullimage popups
const editProfilePopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-new-card');
const fullPopup = document.querySelector('.popup_type_full-pic');

// edit, add and submit buttons
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const addPopupSubmitButton = addCardPopup.querySelector('.popup__submit');

// close buttons
const editCloseButton = editProfilePopup.querySelector('.popup__close-icon');
const addCloseButton = addCardPopup.querySelector('.popup__close-icon');
const fullimageCloseButton = fullPopup.querySelector('.popup__close-icon');

//forms
const editPopupForm = editProfilePopup.querySelector('.popup__form');
const addPopupForm = addCardPopup.querySelector('.popup__form');

// name and job
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// inputs
const inputName = editPopupForm.querySelector('.popup__input_type_name');
const inputJob = editPopupForm.querySelector('.popup__input_type_job');
const inputPlace = addPopupForm.querySelector('.popup__input_type_title');
const inputUrl = addPopupForm.querySelector('.popup__input_type_url');

// full-image and his description
const imagePopupPicture = fullPopup.querySelector('.popup__full-pic');
const imagePopupDescription = fullPopup.querySelector('.popup__title_type_full-pic');


// creating Cards
const cardsTemplate = document.querySelector('.template-card').content.querySelector('.cards__element');
  const cardsList = document.querySelector('.cards');

  function renderCard(data) {
    cardsList.prepend(createCard(data));
  }

  function createCard (data) {
    const card = cardsTemplate.cloneNode(true);
    const cardTitle = card.querySelector('.cards__title');
    const cardImage = card.querySelector('.cards__img');
    const cardLikeButton = card.querySelector('.cards__hearth-button');
    const cardDeleteButton = card.querySelector('.cards__delete-button');

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = 'Please choose antoher link';

    cardLikeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('cards__hearth-button_active');
    });
    cardDeleteButton.addEventListener('click', (event) => {
      event.target.closest('.cards__element').remove();
    });

    cardImage.addEventListener('click', () => {
      imagePopupPicture.src = cardImage.src;
      imagePopupDescription.textContent = cardTitle.textContent;
      togglePopup(fullPopup);
    });
    return card;
  }


  initialCards.forEach((data) => {
    renderCard(data);
  });


// closing popups with esc
function popupCloseByEsc(event) {
    if (event.key === 'Escape') {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
}

function resetInputError(inputElement, inputElementError) {
    inputElement.textContent = '';
    inputElement.classList.remove('popup__input_type_error');
    inputElementError.classList.remove('popup__input-error_active');
}

// opening popup
function togglePopup (popup) {
    if (!popup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    }
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', popupCloseByEsc);
    } else {
        document.removeEventListener('keydown', popupCloseByEsc);
    }
    const input = Array.from(popup.querySelectorAll('.popup__input'));
    input.forEach((inputElement) => {
        const inputError = popup.querySelector(`#${inputElement.name}-error`)
        if (inputElement.validity.valid) {
            resetInputError(inputElement, inputError)
        }
    } )
}

function profileSubmit (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(editProfilePopup);
}

function addCardSubmit (event) {
  event.preventDefault();
  renderCard({name: inputPlace.value, link: inputUrl.value});
  togglePopup(addCardPopup);
  addPopupForm.reset();
  addPopupSubmitButton.classList.add('popup__submit_disabled');
  addPopupSubmitButton.disabled = true;
}

editButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);});
editCloseButton.addEventListener('click', () => {
   togglePopup(editProfilePopup);});
addButton.addEventListener('click', () => {
  togglePopup(addCardPopup);});
addCloseButton.addEventListener('click', () => {
  togglePopup(addCardPopup);});
  fullimageCloseButton.addEventListener('click', () => {
  togglePopup(fullPopup);});

editPopupForm.addEventListener('submit', profileSubmit);
addPopupForm.addEventListener('submit', addCardSubmit);




function closeByOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
        event.target.classList.remove('popup_opened');
    }
}

  addCardPopup.addEventListener('click', (event) => {
    closeByOverlay(event);
});

  fullPopup.addEventListener('click', (event) => {
    closeByOverlay(event);
});

  editProfilePopup.addEventListener('click', (event) => {
    closeByOverlay(event);
});
