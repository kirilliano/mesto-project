'use strict';
//Функции для работы с карточками

import { openImage } from '../components/modal.js'

//Массив начальных фотографий
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Создание начальной галереи
export const elementsBlock = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template').content;

export function addCard (name, link) {
  const template = elementTemplate.querySelector('.element').cloneNode(true);

  const image = template.querySelector('.element__image');
  image.setAttribute('alt', name);
  image.setAttribute('src', link);

  const title = template.querySelector('.element__title');
  title.textContent = name;

  //Лайк
  const likeButton = template.querySelector('.element__button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__button_active')
  })

  //Удаление
  const deleteButton = template.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', function() {
    const element = deleteButton.closest('.element');
    element.remove();
  });
  image.addEventListener('click', openImage);
  return template;
}

export function loadCards() {
  initialCards.forEach(function(item) {
    elementsBlock.append(addCard(item.name, item.link))
  });
};
