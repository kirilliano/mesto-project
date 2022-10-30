'use strict';

//Утилитарные функции, которые используются в работе сразу нескольких других функций

const popups = document.querySelectorAll('.popup');

//Функция открытия попапа
export function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
}

//Функция закрытия попапа
export function closePopup(popupObj) {
  popupObj.classList.remove('popup_opened');
}

//Закрытие попапов кнопкой Esc
function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(function(popEsc) {
      popEsc.classList.remove('popup_opened');
    })
  }
}

//Закрытие попапов по лейауту и крестику
function layoutHandler(evt) {
  popups.forEach(function(onePopup) {
    if (evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__close-button')) {
      onePopup.classList.remove('popup_opened');
    } else if (evt.target.classList.contains('popup_open-image')) {
      onePopup.classList.remove('popup_opened');
    }
  })
}

document.addEventListener('click', layoutHandler);
document.addEventListener('keydown', escapeHandler);
