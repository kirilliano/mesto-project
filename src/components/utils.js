//Константы для профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#username-field');
const jobInput = document.querySelector('#userinfo-field');
const profileName = '.profile__name';
const profileInfo = '.profile__info';
const popupEditProfile = '#popupEditProfile';
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const profileAvatar = '.profile__avatar';
const templateSelector = '.element__template';
const cardsContainer = '.elements';

//Константы для фото
const popupImage = document.querySelector('.popup__image');

const setFormValid = {
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
    'authorization': 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
    'Content-Type': 'application/json'
  }
}

export {
  profileEditButton, nameInput, jobInput, profileName, profileInfo, popupEditProfile,
  config, profileAvatar, profileAvatarContainer,popupImage, setFormValid, templateSelector,
  cardsContainer
}
