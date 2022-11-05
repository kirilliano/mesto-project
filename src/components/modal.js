'use strict';

import { openPopup } from '../components/utils.js'

//Работа модальных окон

//DOM для открытия картинки
const openImagePopup = document.querySelector('.popup_open-image');
const popupImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');
//Открытие попапа с картинкой
export function openImage(name, link) {
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  imageCaption.textContent = name;

  openPopup(openImagePopup);
}
