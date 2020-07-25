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


//Opening edit-popup
const profileEditButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const firstname = document.querySelector('.profile__name');
const secondname = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');


function openPopup() {
	popup.classList.add('popup_opened');
}

function closePopup() {
	popup.classList.remove('popup_opened');
	nameInput.value = firstname.textContent;
	jobInput.value = secondname.textContent;
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
	evt.preventDefault();

	nameInput.value;
	jobInput.value;

	firstname.textContent = nameInput.value;
	secondname.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);


//opening add-popup
const profileAddButton = document.querySelector('.profile__add-btn');
const popupAddCardCloseButton = document.querySelector('.popup__close-icon_add-new');
const popupAddCard = document.querySelector('.popup_add-new-card');
const formAddCard = document.querySelector('.popup__form_add-new-card');
const titleInput = document.querySelector('.popup__input_title');
const linkInput = document.querySelector('.popup__input_url');

function openAddCardPopup() {
	popupAddCard.classList.add('popup_opened');
}

function closeAddCardPopup() {
	popupAddCard.classList.remove('popup_opened');
	titleInput.value = '';
	linkInput.value = '';
}

profileAddButton.addEventListener('click', openAddCardPopup);
popupAddCardCloseButton.addEventListener('click', closeAddCardPopup);


function formSubmitAddCard (evt) {
	evt.preventDefault();

	renderCard({name: titleInput.value, link: linkInput.value})
}

formAddCard.addEventListener('submit', formSubmitAddCard);
formAddCard.addEventListener('submit', closeAddCardPopup);




//creating the gallery
const elements = document.querySelector('.cards');
const elementTemplate = document.querySelector('#template-card').content.querySelector('.cards__element');

function createCard(data) {
  const cardElement = elementTemplate.cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.cards__hearth-button');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-button');


  const cardTitle = cardElement.querySelector('.cards__title');
	const cardImage = cardElement.querySelector('.cards__img');
	const elementFullImage = cardElement.querySelector('.cards__img');
	const elementFullImageCloseButton = document.querySelector('.popup__close-icon__full-image-close');
  const popupElementFullImage = document.querySelector('.popup__full');
  const popupElementFullImageTitle = document.querySelector('.popup__title__full-title');
	const popupElementFullImageForm = document.querySelector('.popup__full-image');


	cardTitle.textContent = data.name;
	cardImage.src = data.link;

	cardLikeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('cards__hearth-button_active');
	});

	cardDeleteButton.addEventListener('click', function () {
		const listItem = cardDeleteButton.closest('.cards__element');
		listItem.remove();
	});

	elementFullImage.addEventListener('click', function () {
		popupElementFullImage.classList.add('popup_opened');
		popupElementFullImageTitle.textContent = data.name;
		popupElementFullImageForm.src = data.link;
	});

	elementFullImageCloseButton.addEventListener('click', function () {
		popupElementFullImage.classList.remove('popup_opened');
	});

	return cardElement;
}

function renderCard(data) {
	elements.prepend(createCard(data));
}

initialCards.forEach((data) => {
	renderCard(data);
})
