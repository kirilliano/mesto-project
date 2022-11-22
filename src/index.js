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
  openImagePopup, popupImage, imageCaption, setForValid
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
    cards/**(константа из new Section) */.render(cardsData);
  })
  .catch(err => console.log(err))

//Редактирование профиля
//заполняет форму
const renderProfileValues = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name
  jobInput.value = userInfo.about
}

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

//попап с картинкой
const imagePopup = new PopupWithImage('.popup__image')

const createCard = data => {
  const card = new Card(data, userInfo.userId, '.element__template',{
    cardClick: data => popupImage.open(data),
    cardDelete: (id) => {api.deleteCard(id)}
  })
}





