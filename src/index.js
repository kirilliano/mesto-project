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
  profileEditButton, nameInput, jobInput, profileName, profileInfo, popupEditProfile,
  formEditProfile, saveNewProfile, config, profileAvatar, profileAvatarContainer,
  photoTitle, addPhotoButton, photoLink, addPhotoPopup, addPhotoForm, createNewCard,
  openImagePopup, popupImage, imageCaption
} from './utils.js'

//получение данных
const api = new Api(config)
const userInfo = new UserInfo({
  profileName, profileInfo, profileAvatar
})

api
  .getData()
  .then(data => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    cards.render(cardsData);
  })
  .catch(err => console.log(err))

//Редактирование профиля

profilePopupCallback = data => {
  profilePopup.setButtonLoadingStatus(true)
  api.getUserData(data)
  .then(res => {
    userInfo.getUserData(res);
    profilePopup.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    profilePopup.setBtnStatusSaving(false);
  });
}

const profilePopup = new PopupWithForm(
  popupEditProfile,
  profilePopupCallback
)



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


