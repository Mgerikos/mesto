//popup for full-pic
export const popupFullPicture = document.querySelector('.popup_type_full-pic');
export const popupPictureTitle = popupFullPicture.querySelector('.popup__title_type_full-pic');
export const popupPictureImg = popupFullPicture.querySelector('.popup__full-pic');


//popup opening function
export const openPopupItem = (popupWindow) => {
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKeydown);
}

//popup closing function
export const closePopupItem = (popupWindow) => {
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKeydown);
}

//popup close by esc
function handleEscKeydown(event) {
  const openPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape' && openPopup) {
    closePopupItem(openPopup);
  }
}


