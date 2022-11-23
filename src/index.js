'use strict';

//Инициализация JS-кода, добавление слушателей и другие важные участки

import '../src/pages/index.css';
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
  config, profileAvatar, profileAvatarContainer, popupImage, templateSelector,
  cardsContainer
} from '../src/components/utils.js'

//получение данных
const api = new Api(config)

const userInfo = new UserInfo(
  profileName, profileInfo, profileAvatar
)

//Редактирование профиля
//заполняет форму
const renderProfileValues = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name
  jobInput.value = userInfo.about
}

const profilePopupCallback = data => {
  profilePopup.setButtonLoadingStatus(true)
  api
    .getUserData(data)
    .then(res => {
      userInfo.getUserData(res);
      profilePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.setButtonLoadingStatus(false);
    });
}

const profilePopup = new PopupWithForm(
  popupEditProfile,
  profilePopupCallback
)

//попап с картинкой
const imagePopup = new PopupWithImage('.popup__image')

//карточки
function createCard (data) {
  const card = new Card({data}, userInfo.userId, templateSelector, {
    cardClick: data => popupImage.open(data),
    cardDelete: () => api.deleteCard(data._id)
  })
  return card;
};

const cards = new Section({
  renderer: item => {
    const card = createCard(item);
    const cardElement = card.generate();
    cards.setItems(cardElement)
  }
},
  cardsContainer)

api
  .getData()
  .then(data => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    cards.render(cardsData);
  })
  .catch(err => console.log(err));



