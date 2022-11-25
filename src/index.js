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
  profileEditButton, buttonAdd,nameInput, jobInput, profileName, profileInfo, popupEditProfile,
  config, profileAvatar, profileAvatarContainer, templateSelector,
  cardsContainer, setFormValid, popups, popupAddCardSelector
} from '../src/components/utils.js'

//получение данных
const api = new Api(config)

const userInfo = new UserInfo(
  profileName, profileInfo, profileAvatar
)
///////////////////////Попапы////////////////
//Редактирование профиля
const renderProfileValues = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name
  jobInput.value = userData.about
}

const profilePopupCallback = data => {
  profilePopup.setButtonLoadingStatus(true)
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
const imagePopup = new PopupWithImage('.popup_open-image')

//добавление карточки
const addCardCallback = data => {
  console.log(data)
  popupAddCard.setButtonLoadingStatus(true);
  api
    .addCardToServer(data)
    .then(res => {
      cards.setAddedItems(createCard(res));
      popupAddCard.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.setButtonLoadingStatus(false);
    });
};

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  addCardCallback
);

///////////////////////////////////////////////

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

    cardLike: (hasMyLike, cardID) => {
      if (hasMyLike) {
        api
          .disactivateLike(cardID)
          .then(data => {
            card.setLike(data);
          })
          .catch(err => console.log(err));
      } else {
        api
          .activateLike(cardID)
          .then(data => {
            card.setLike(data);
          })
          .catch(err => console.log(err));
      }
    }

  })
  return card.generate();
}

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


//валидация
function validation (formElement) {
  const formValidator = new FormValidator(setFormValid, formElement)
  formValidator.enableValidation()
}

popups.forEach((popup) => {validation(popup)})


//слушатели для попапов
profileEditButton.addEventListener('click', () => {
  renderProfileValues();
  profilePopup.open();
});

buttonAdd.addEventListener('click', () => {
  popupAddCard.open()
})





