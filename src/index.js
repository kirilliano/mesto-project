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
  jobInput.value = userData.about
}

const profilePopupCallback = data => {
  profilePopup.setButtonLoadingStatus(true)
  console.log(data)
  api
    .updateProfile(data)
    .then(res => {
      userInfo.setUserInfo(res);
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
const createCard = (data) => {
  const card = new Card(data, userInfo.userId, templateSelector, {
    cardClick: data => imagePopup.open(data),

    cardDelete: (cardElement, cardID) => {
    api
    .deleteCard(cardID)
    .then(() => cardElement.remove())
    .catch(err => console.log(err))
    },

    cardLike: {}
  })
  return card.generate();
};

let cards

api
  .getData()
  .then(data => {
    const [userData, cardsData] = data;
    cards = new Section({
      data: cardsData,
      renderer: item => {

        const cardElement = createCard(item);
        cards.setItems(cardElement)
      }
    },
      cardsContainer);
    userInfo.setUserInfo(userData);
    cards.render();
  })
  .catch(err => console.log(err));

  profileEditButton.addEventListener('click', () => {
    renderProfileValues();
    profilePopup.open();
  });



