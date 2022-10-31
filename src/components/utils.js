'use strict';

//Утилитарные функции, которые используются в работе сразу нескольких других функций
const popups = document.querySelectorAll('.popup');

function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция открытия попапа
export function openPopup(popupObj) {
  popupObj.classList.add('popup_opened');
  document.addEventListener('keydown', escapeHandler);
}

//Функция закрытия попапа
export function closePopup(popupObj) {
  popupObj.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeHandler);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup_open-image')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})
