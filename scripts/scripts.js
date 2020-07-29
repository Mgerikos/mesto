const initialCards = [
  {
      name: 'Looking for light',
      link: 'https://4.downloader.disk.yandex.ru/preview/75b69ab5cedd260abb97eb8a82601eee4142ffbd86ee6fe677bc1a170fef21c0/inf/3rAgw_2G4vjOywVDq8uAi95CgFs1N8miJnsVySeM_GyCJmMwpbdZYkibncBAyXpvzAXw4VqCdpK_ijIj3xAMPQ%3D%3D?uid=1051192678&filename=first.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1051192678&tknv=v2&size=1301x656'
  },
  {
      name: 'Winter kiss',
      link: 'https://drscdn.500px.org/photo/244369347/m%3D900/v2?sig=e9c75222b099f8232784148240e0a050d716fd0a19460ff3254dc3e3dc27d4e9'
  },
  {
      name: 'Tired and lay down',
      link: 'https://drscdn.500px.org/photo/231337729/m%3D900/v2?sig=13a8177959bebab0c672dd932927d051da742d7560c7760a7dba7a5546a6a544'
  },
  {
      name: 'The Pyrenees',
      link: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/59841988_621668038244457_7044709692244754432_n.jpg?_nc_cat=108&_nc_sid=0be424&_nc_ohc=oqu1_r8_5-kAX_tyi0P&_nc_ht=scontent-arn2-2.xx&oh=09f568d15a68f7c552789df7e324e05b&oe=5F449A6F'
  },
  {
      name: 'Passionate dance',
      link: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/59773514_621666431577951_8471555827214319616_n.jpg?_nc_cat=104&_nc_sid=0be424&_nc_ohc=tUDauoQggXsAX82RWg0&_nc_ht=scontent-arn2-1.xx&oh=37834ca2c41897d3d83ff86c73e7453b&oe=5F4489C3'
  },
  {
    name: 'My love',
    link: 'https://2.downloader.disk.yandex.ru/preview/31e8f7b0bf8f736bb24a311e18d7c2d32e0e10b449b60fa65ef0897a4c1eee5f/inf/H3dHZLh3A7g6ApywePKCrShGPvdqnF-3R8C7WPrSY8LH-Gp-zqmGH8bjPuwW--wxJKEZKzuANq-iC40lKWnLHg==?uid=1051192678&filename=61542196_2347251561999297_2596253613844070400_n.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&tknv=v2&owner_uid=1051192678&size=1301x656'
},
  {
      name: 'Armenian mountains with some clothes',
      link: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/59730715_621666404911287_1510945369901498368_n.jpg?_nc_cat=100&_nc_sid=0be424&_nc_ohc=7k9aqAC6vzcAX8FGFQs&_nc_ht=scontent-arn2-2.xx&oh=b8e2b812352ffab471a42f6000909a94&oe=5F454585'
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

const elementFullImageCloseButton = document.querySelector('.popup__close-icon__full-image-close');
const popupElementFullImage = document.querySelector('.popup__full');
const popupElementFullImageTitle = document.querySelector('.popup__title__full-title');
const popupElementFullImageForm = document.querySelector('.popup__full-image');

function createCard(data) {
  const cardElement = elementTemplate.cloneNode(true);

  const cardLikeButton = cardElement.querySelector('.cards__hearth-button');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-button');


  const cardTitle = cardElement.querySelector('.cards__title');
	const cardImage = cardElement.querySelector('.cards__img');
  const elementFullImage = cardElement.querySelector('.cards__img');


	cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

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
