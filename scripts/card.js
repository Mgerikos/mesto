import { openPopupItem, popupFullPicture, popupPictureTitle, popupPictureImg } from './utils.js';


export class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
  }

  _remove = () => {
    this._view.remove();
  }

  _like = (evt) => {
    evt.target.classList.toggle('cards__hearth-button_active');
  }

  _handlePreviewPhoto = () => {
    popupPictureTitle.textContent = this._name;
    popupPictureImg.src = this._link;
    popupPictureImg.alt = this._name;

    openPopupItem(popupFullPicture);
  }

  getView() {
    this._view = this._cardTemplate.content.children[0].cloneNode(true);
    const text = this._view.querySelector('.cards__title');
    const image = this._view.querySelector('.cards__img');
    const deleteBtn = this._view.querySelector('.cards__delete-button');
    const hearthBtn = this._view.querySelector('.cards__hearth-button');

    text.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    deleteBtn.addEventListener('click', this._remove);
    hearthBtn.addEventListener('click', this._like);

    image.addEventListener('click', this._handlePreviewPhoto);

    return this._view;
  }
}
