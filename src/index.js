'use strict';

//Инициализация JS-кода, добавление слушателей и другие важные участки

import '../src/pages/index.css';
import { enableValidation } from './components/FormValidator.js';
import { openPopup, closePopup } from './components/utils.js';
import { getUserData, getInitialCards, updateProfile, addCardToServer, changeAvatar } from './components/api.js';
import { addCard, elementsBlock } from './components/card.js'

//DOM для редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#username-field');
const jobInput = document.querySelector('#userinfo-field');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfile = document.querySelector('#popupEditProfile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const saveNewProfile = popupEditProfile.querySelector('#saveNewProfile');

//Редактирование профиля
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  openPopup(popupEditProfile);
})

function showTimeout(button) {
  const message = 'Сохранить';
  button.textContent = message;
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    saveNewProfile.textContent = "Сохранение...";

    updateProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileInfo.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch(function(err) {
      console.log(`Ошибка ${err.status}`)
    })
    .finally(function() {
      setTimeout(showTimeout, 1000, saveNewProfile)
    });
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
  createNewCard.textContent = "Сохранение...";

  addCardToServer(photoTitle.value, photoLink.value)
  .then(res => {
    elementsBlock.prepend(addCard(res));
    closePopup(addPhotoPopup);
    evt.target.reset();
    createNewCard.classList.add('popup__button_disabled');
    createNewCard.disabled = true;
  })
  .catch(function(err) {
    console.log(`Ошибка ${err.status}`)
  })
  .finally(function() {
    showTimeout(createNewCard)
  });
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

//DOM для открытия картинки
const openImagePopup = document.querySelector('.popup_open-image');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

//Открытие попапа с картинкой
export function openImage(evt) {
  const image = evt.target;
  popupImage.setAttribute('src', image.src);
  popupImage.setAttribute('alt', image.alt);
  imageCaption.textContent = image.alt;

  openPopup(openImagePopup);
}

//Изменение аватара
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
export const profileAvatar = profileAvatarContainer.querySelector('.profile__avatar');

const popupChangeAvatar = document.querySelector('#popupChangeAvatar');
const changeAvatarForm = popupChangeAvatar.querySelector('#changeAvatarForm');
const avatarUrlInput = changeAvatarForm.querySelector('#avatar-url');
const newAvatarSubmitButton = changeAvatarForm.querySelector('#changeAvatarSubmitButton');

//Открытие попапа изменения аватара
profileAvatarContainer.addEventListener('click', function () {
  openPopup(popupChangeAvatar);
});

function handleNewAvatarSubmit (evt) {
  evt.preventDefault();
  newAvatarSubmitButton.textContent = "Сохранение...";
  changeAvatar(avatarUrlInput.value)
    .then(res => {
      profileAvatar.src = res.avatar;
      closePopup(popupChangeAvatar);
    })
    .catch(function(err) {
      console.log(`Ошибка ${err.status}`)
    })
    .finally(function() {
      setTimeout(showTimeout, 1000, newAvatarSubmitButton)
    });
}
changeAvatarForm.addEventListener('submit', handleNewAvatarSubmit);


export let userId;
function initUserId(id) {
  userId = id;
}

Promise.all([getUserData(), getInitialCards()])
  .then(res => {
    initUserId(res[0]._id);
    profileName.textContent = res[0].name;
    profileInfo.textContent = res[0].about;
    profileAvatar.src = res[0].avatar;

    res[1].forEach(card => {
      elementsBlock.append(addCard(card));
    });
  })
  .catch(function(err) {
    console.log(`Ошибка ${err.status}`)
  })

