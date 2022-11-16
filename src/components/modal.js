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


class Popup {
  constructor(selector) {
		this._popup = document.querySelector(selector);
    this.popups = document.querySelectorAll('.popup');
	}

	open() {
		this._popup.classList.add("popup_opened");
		this._setEventListeners();
	}

	close() {
		this._popup.classList.remove("popup_opened");
		this._setEventListeners();
	}

	_handlePressEsc = (evt) => {
		evt.preventDefault()
		if (evt.key === "Escape") {
			this.close();
		}
	};

	_handlePressClick() {
		this.popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          close(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          close(popup)
        }
      })
    })
	};

	_setEventListeners() {
		this._popup.addEventListener("mousedown", this._handlePressClick);
		document.addEventListener("keydown", this._handlePressEsc);

    this._popup.removeEventListener("mousedown", this._handlePressClick);
		document.removeEventListener("keydown", this._handlePressEsc);
	}
}
