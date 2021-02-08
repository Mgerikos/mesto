import './index.css';

import {
    initialCards,
    profileEditButton,
    profileAddButton,
    formProfileElement,
    nameInput,
    jobInput,
    formElementCards,
    validationConfig
} from '../utils/constants.js';

import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

const profileFormValidator = new FormValidator(validationConfig, formProfileElement);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(validationConfig, formElementCards);
newCardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_img');
popupWithImage.setEventListeners();

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item)
        cardList.addItem(cardElement);
    }
}, '.cards');
cardList.renderItems();

const popupCardsWithForm = new PopupWithForm(
    '.popup_add-new-card',
    {
        handleFormSubmit: (item) => {
            const cardElement = createCard(item)
            cardList.prependItem(cardElement);
        }
    });
popupCardsWithForm.setEventListeners();

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

const popupProfileWithForm = new PopupWithForm(
    '.popup_edit-profile',
    {
        handleFormSubmit: (item) => {
            userInfo.setUserInfo(item);
        }
    }
);
popupProfileWithForm.setEventListeners();

function createCard(item) {
    const card = new Card(item, '.card', popupWithImage);
    const cardElements = card.generateCard();
    return cardElements;
}

profileAddButton.addEventListener('click', function () {
    popupCardsWithForm.open();
    newCardFormValidator.resetValidation();
});

profileEditButton.addEventListener('click', function () {
    popupProfileWithForm.open();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
    profileFormValidator.resetValidation();
});


