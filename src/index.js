'use strict';

//Инициализация JS-кода, добавление слушателей и другие важные участки

import '../src/pages/index.css';
import Popup from './components/Popup';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import Api from './components/api';
import Card from './components/card';
import FormValidator from './components/FormValidator';
import Section from './components/Section';
import UserInfo from './components/UserInfo';


//DOM для редактирование профиля
import {
  profileEditButton, nameInput, jobInput, profileName, profileInfo,
  popupEditProfile, formEditProfile, saveNewProfile, config, profileAvatar,
  profileAvatarContainer
} from './utils.js'

const api = new Api(config)
const userInfo = new UserInfo({
  profileName, profileInfo, profileAvatar
})

//Редактирование профиля

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

function handleCardFormSubmit(evt) {
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
    .catch(function (err) {
      console.log(`Ошибка ${err.status}`)
    })
    .finally(function () {
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

const popupChangeAvatar = document.querySelector('#popupChangeAvatar');
const changeAvatarForm = popupChangeAvatar.querySelector('#changeAvatarForm');
const avatarUrlInput = changeAvatarForm.querySelector('#avatar-url');
const newAvatarSubmitButton = changeAvatarForm.querySelector('#changeAvatarSubmitButton');

//Открытие попапа изменения аватара
profileAvatarContainer.addEventListener('click', function () {
  openPopup(popupChangeAvatar);
});

function handleNewAvatarSubmit(evt) {
  evt.preventDefault();
  newAvatarSubmitButton.textContent = "Сохранение...";
  changeAvatar(avatarUrlInput.value)
    .then(res => {
      profileAvatar.src = res.avatar;
      closePopup(popupChangeAvatar);
    })
    .catch(function (err) {
      console.log(`Ошибка ${err.status}`)
    })
    .finally(function () {
      setTimeout(showTimeout, 1000, newAvatarSubmitButton)
    });
}
changeAvatarForm.addEventListener('submit', handleNewAvatarSubmit);


export let userId;
function initUserId(id) {
  userId = id;
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  .catch(function (err) {
    console.log(`Ошибка ${err.status}`)
  })

