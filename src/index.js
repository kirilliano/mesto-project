'use strict';

//Инициализация JS-кода, добавление слушателей и другие важные участки

import '../src/pages/index.css';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/utils.js';
import { elementsBlock, loadCards, addCard } from './components/card.js';

//DOM для редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#username-field');
const jobInput = document.querySelector('#userinfo-field');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfile = document.querySelector('#popupEditProfile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const saveNewProfile = popupEditProfile.querySelector('#saveNewProfile');

loadCards();

//Редактирование профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  openPopup(popupEditProfile);
  saveNewProfile.classList.remove('popup__button_disabled');

})

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Добавление фото через попап
const photoTitle = document.querySelector('#phototitle-field');
const photoLink = document.querySelector('#photolink-field');
const addPhotoButton = document.querySelector('.profile__add-button');
const addPhotoPopup = document.querySelector('#popupAddPhoto');
const addPhotoForm = addPhotoPopup.querySelector('#formAddPhoto');
const createNewCard = addPhotoForm.querySelector('#createNewCard');

//Открытие попапа добавления фото
addPhotoButton.addEventListener('click', function () {
  openPopup(addPhotoPopup);
});

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  elementsBlock.prepend(addCard(photoTitle.value, photoLink.value));
  closePopup(addPhotoPopup);
  addPhotoForm.reset();
  createNewCard.classList.add('popup__button_disabled');
  createNewCard.disabled = true;
}
addPhotoForm.addEventListener('submit', handleCardFormSubmit);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
