const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#username-field');
const jobInput = document.querySelector('#userinfo-field');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfile = document.querySelector('#popupEditProfile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const saveNewProfile = popupEditProfile.querySelector('#saveNewProfile');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const profileAvatar = profileAvatarContainer.querySelector('.profile__avatar');
const photoTitle = document.querySelector('#phototitle-field');
const photoLink = document.querySelector('#photolink-field');
const addPhotoButton = document.querySelector('.profile__add-button');
const addPhotoPopup = document.querySelector('#popupAddPhoto');
const addPhotoForm = addPhotoPopup.querySelector('#formAddPhoto');
const createNewCard = addPhotoForm.querySelector('#createNewCard');
const openImagePopup = document.querySelector('.popup_open-image');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');
const setForValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
  }
}
export {
  profileEditButton, nameInput, jobInput, profileName, profileInfo, popupEditProfile,
  formEditProfile, saveNewProfile, config, profileAvatar, profileAvatarContainer,
  photoTitle, addPhotoButton, photoLink, addPhotoPopup, addPhotoForm, createNewCard,
  openImagePopup, popupImage, imageCaption, setForValid
}
