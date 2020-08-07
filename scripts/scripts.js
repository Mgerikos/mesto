const initialCards = [
  {
      name: 'Winter kiss',
      link: 'https://4.downloader.disk.yandex.ru/preview/26d3619146203813e1231fe17d7c0b652c71248c24ce0079f5dbf12ee616ac40/inf/_QsBwihGJG6RWaU5kBhg6Q-bXwHmevvSl1bZ5_Si2I4P7SSW__roV8_9fCfk76tplL0hGp5DIvRtgHPhVQMRtw%3D%3D?uid=1051192678&filename=e.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1051192678&tknv=v2&size=1301x656'
  },
  {
      name: 'Tired and lay down',
      link: 'https://drscdn.500px.org/photo/231337729/m%3D900/v2?sig=13a8177959bebab0c672dd932927d051da742d7560c7760a7dba7a5546a6a544'
  },
  {
      name: 'The harvest time',
      link: 'https://4.downloader.disk.yandex.ru/preview/d8701b14a9b3f22164b8f4966f9d81016c670ef4efa13a54a48e6489fe7aeffe/inf/yqYXslcQycgVceo2NISE0cGnc_JOt2WpoCFO89e1C3dq2PHwKRx48RBdRir4ulQMgXQ6McT6BNZuliXTFLRNCg%3D%3D?uid=1051192678&filename=tati1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1051192678&tknv=v2&size=1301x656'
  },
  {
      name: 'Passionate dance',
      link: 'https://1.downloader.disk.yandex.ru/preview/b27f3bbb3ad0b4deac1c93a82218dfef8e3d25f2a95a8d2e1e5189c7a6f9e5cb/inf/sIb2_DC43fj1o2bP4qmT6ctPWBngc3nzAMWSAsRUItm1ld_2BAi94LTZNMNcvKsBSfbVy2PPh-Ca7ZFdG5KeBA%3D%3D?uid=1051192678&filename=Без%20имени-1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1051192678&tknv=v2&size=1301x656'
  },
  {
    name: 'My love',
    link: 'https://1.downloader.disk.yandex.ru/preview/9daa09aa7c2714fceceea92526cb879c978b0fa9680cb66cbec0bdf7aef9847d/inf/cC_K_pzsyqsVA4c910M3HqFcfb5DdcpdsPHjksoPpLpteTC8aY14R6X63Hb2HOGtA62pKptbZo-7AmX2bqf_yg%3D%3D?uid=1051192678&filename=Armine1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1051192678&tknv=v2&size=1301x656'
},
  {
      name: 'Armenian mountains with some clothes',
      link: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/59730715_621666404911287_1510945369901498368_n.jpg?_nc_cat=100&_nc_sid=0be424&_nc_ohc=7k9aqAC6vzcAX8FGFQs&_nc_ht=scontent-arn2-2.xx&oh=b8e2b812352ffab471a42f6000909a94&oe=5F454585'
  }
];

const popup = document.querySelector('.popup');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const formElement = popupEditProfile.querySelector('.popup__form');
const profileEditButton = document.querySelector('.profile__edit-btn');
const editProfileCloseIcon = popupEditProfile.querySelector('.popup__close-icon');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const popupAddCard = document.querySelector('.popup_add-new-card');
const formAddCard = popupAddCard.querySelector('.popup__form_new-card');
const addCardButton = document.querySelector('.profile__add-btn');
const addCardCloseIcon = popupAddCard.querySelector('.popup__close-icon');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const urlInput = formAddCard.querySelector('.popup__input_type_url');
const buttonElementAddCard = document.querySelector('.popup__submit');

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupEsc);
	document.addEventListener('mousedown', closePopupMousedown);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupEsc);
	document.removeEventListener('mousedown', closePopupMousedown);
}

function formSubmitHandler (evt) {
	evt.preventDefault();
	userName.textContent = nameInput.value;
	userJob.textContent = jobInput.value;
}

profileEditButton.addEventListener('click', function () {
	nameInput.value = userName.textContent;
	jobInput.value = userJob.textContent;
	openPopup(popupEditProfile);
});
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitAddCard (evt) {
	evt.preventDefault();

	renderCard({name: titleInput.value, url: urlInput.value})
}


addCardButton.addEventListener('click', function () {
	titleInput.value = '';
	urlInput.value = '';
	openPopup(popupAddCard);
	buttonElementAddCard.classList.add('button_disabled');
	buttonElementAddCard.setAttribute('disabled', '');
});
formAddCard.addEventListener('submit', formSubmitAddCard);

editProfileCloseIcon.addEventListener('click', function () {
	closePopup(popupEditProfile);
});

addCardCloseIcon.addEventListener('click', function () {
	closePopup(popupAddCard);
});

formElement.addEventListener('submit', function () {
	closePopup(popupEditProfile);
});

formAddCard.addEventListener('submit', function () {
	closePopup(popupAddCard);
});


const cards = document.querySelector('.cards');
const elementTemplate = document.querySelector('#template-card').content.querySelector('.cards__element');
const popupElementFullPic = document.querySelector('.popup_type_full-pic');
const elementFullPicCloseIcon = popupElementFullPic.querySelector('.popup__close-icon');
const popupElementFullPicContainer = document.querySelector('.popup__full-pic');
const popupElementFullPicTitle = document.querySelector('.popup__title_type_full-pic');

function createCard(data) {
	const cardElement = elementTemplate.cloneNode(true);

	const cardImage = cardElement.querySelector('.cards__img');
	const cardTitle = cardElement.querySelector('.cards__title');
  const elementFullImage = cardElement.querySelector('.cards__img');
  const cardLikeButton = cardElement.querySelector('.cards__hearth-button');
	const cardDeleteButton = cardElement.querySelector('.cards__delete-button');


	cardTitle.textContent = data.name;
	cardImage.src = data.link;
	cardImage.alt = 'Please choose antoher link';

	cardLikeButton.addEventListener('click', function (evt) {
		evt.target.classList.toggle('cards__hearth-button_active');
	});

	cardDeleteButton.addEventListener('click', function () {
		const listItem = cardDeleteButton.closest('.cards__element');
		listItem.remove();
	});

	elementFullImage.addEventListener('click', function () {
		openPopup(popupElementFullPic);
		popupElementFullPicTitle.textContent = data.name;
		popupElementFullPicContainer.src = data.link;
		popupElementFullPicContainer.alt = 'Nice full image';
	});

	return cardElement;
}

elementFullPicCloseIcon.addEventListener('click', function () {
	closePopup(popupElementFullPic);
});

function renderCard(data) {
	cards.prepend(createCard(data));
}

initialCards.forEach((data) => {
	renderCard(data);
})



const popupList = document.querySelectorAll('.popup');

function closePopupEsc(evt) {
	if (evt.keyCode == 27) {
		for (var i = 0; i < popupList.length; i++) {
			if (popupList[i].classList.contains('popup_opened')) {
				popupList[i].classList.remove('popup_opened');
			}
		}
	document.removeEventListener('keydown', closePopupEsc);
	document.removeEventListener('mousedown', closePopupMousedown);
	}
};

function closePopupMousedown(evt) {
	if (evt.target.classList.contains('popup_opened')) {
		for (var i = 0; i < popupList.length; i++) {
			if (popupList[i].classList.contains('popup_opened')) {
				popupList[i].classList.remove('popup_opened');
			}
		}
	document.removeEventListener('keydown', closePopupEsc);
	document.removeEventListener('mousedown', closePopupMousedown);
	}
};

