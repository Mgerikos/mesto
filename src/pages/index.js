import './index.css';
import Api from '../components/api';
import {
    profileEditButton,
    profileAddButton,
    formProfileElement,
    nameInput,
    jobInput,
    formElementCards,
    formElementAvatar,
    avatarEditButton,
    avatarPhoto,
    validationConfig
} from '../utils/constants.js';

import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupSubmit from '../components/PopupSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

let userId = null;

const profileFormValidator = new FormValidator(validationConfig, formProfileElement);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(validationConfig, formElementCards);
newCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, formElementAvatar);
avatarFormValidator.enableValidation();


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '417a9d8d-d5c8-4986-b819-3441c977454a',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo()
    .then((item) => {
        userId = item._id;
        avatarPhoto.src = item.avatar;
        document.querySelector('.profile__name').textContent = item.name;
        document.querySelector('.profile__job').textContent = item.about;

    })
    .then(() => {
        profileEditButton.addEventListener('click', function () {
            popupProfileWithForm.open();
            nameInput.value = userInfo.getUserInfo().name;
            jobInput.value = userInfo.getUserInfo().job;
            profileFormValidator.resetValidation();
        });
        avatarEditButton.addEventListener('click', () => {
            popupUpdateAvatar.open();
            avatarFormValidator.resetValidation();
        })

    })
    .catch((err) => console.log(err));;


api.getInitialCards()
    .then((cards) => {
        const cardList = new Section({
            items: cards,
            renderer: ((item) => {
                const cardElement = createCard(item);
                cardList.addItem(cardElement);
            })
        }, '.cards');
        cardList.renderItems();
    })
    .then(() => {
        profileAddButton.addEventListener('click', function () {
            popupCardsWithForm.open();
            newCardFormValidator.resetValidation();
        });

    })
    .catch((err) => console.log(err));


const popupCardsWithForm = new PopupWithForm(
    '.popup_add-new-card',
    {
        handleFormSubmit: (item) => {
            renderLoading(true, formElementCards);
            api.postCard(item)
                .then((item) => {

                    const cardElement = createCard(item);
                    const cardList = document.querySelector('.cards');
                    cardList.prepend(cardElement);
                })
                .finally(() => {
                    renderLoading(false, formElementCards)
                })
        }

    }
);
popupCardsWithForm.setEventListeners();


const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__job' });

const popupProfileWithForm = new PopupWithForm(
    '.popup_edit-profile',
    {
        handleFormSubmit: (item) => {
            renderLoading(true, formProfileElement)
            api.patch(item)
                .then((item) => {
                    userInfo.setUserInfo({ name: item.name, about: item.about });
                })
                .finally(() => {
                    renderLoading(false, formProfileElement)
                })
        }
    }
);
popupProfileWithForm.setEventListeners();


const popupRemoveCard = new PopupSubmit('.popup_remove-card');

const popupUpdateAvatar = new PopupWithForm('.popup_avatar',
    {
        handleFormSubmit: (avatar) => {
            renderLoading(true, formElementAvatar)
            api.updateAvatar(avatar.link)
                .then((item) => {
                    item.avatar = avatar.link
                    avatarPhoto.src = item.avatar;

                })
                .finally(() => {
                    renderLoading(false, formElementAvatar)
                })
        }
    }

);
popupUpdateAvatar.setEventListeners();


const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

function createCard(item) {
    const card = new Card(item, '.card', popupWithImage, userId,
        {
            handleButtonDeleteCard: () => {
                popupRemoveCard.setEventListeners(() => { removeCard(card) });
                popupRemoveCard.open();
            }
        },
        {
            handleLikeAddClick: () => {
                api
                    .addLike(card.getCardId())
                    .then((res) => {
                        card.returnLikes(res.likes.length);
                    })
                    .catch((err) => console.log(err))
            }
        },
        {
            handleLikeDelete: () => {
                api
                    .deleteLike(card.getCardId())
                    .then((res) => {
                        card.returnLikes(res.likes.length);
                    })
                    .catch((err) => console.log(err))
            }

        }
    );

    const cardElements = card.generateCard();
    return cardElements;
}


function removeCard(card) {

    api.deleteCard(card.getCardId())
        .then(() => {
            popupRemoveCard.close();
            card.removeCard();
        })
        .catch((err) => console.log(err));
}


function renderLoading(isLoading, popupForm) {
    if (isLoading) {
        popupForm.querySelector('.popup__button-submit').textContent = 'saving';
    } else {
        popupForm.querySelector('.popup__button-submit').textContent = 'save';
    }
}

