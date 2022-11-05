//Функции для работы с карточками

import { disactivateLike, activateLike, deleteCard } from './api.js'
import { openImage } from './modal.js'
import { userId } from '../index.js'

//Создание начальной галереи и создание карточки
export const elementsBlock = document.querySelector('.elements');
export const elementTemplate = document.querySelector('.element__template').content;

function hasMyLike(card) {
  return card.likes.some(function(like) {
    return like._id === userId;
  })
}

export function addCard (card, elementTemplate) {
  const template = elementTemplate.querySelector('.element').cloneNode(true);
  const likesCounter = template.querySelector('.element__likes-counter');
  const likeButton = template .querySelector('.element__button');

  const image = template.querySelector('.element__image');
  image.setAttribute('alt', card.name);
  image.setAttribute('src', card.link);

  const title = template.querySelector('.element__title');
  title.textContent = card.name;

  likesCounter.textContent = card.likes.length;

  if (hasMyLike(card)) {
    likeButton.classList.add('element__button_active');
  }

  likeButton.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button_active')) {
      disactivateLike(card._id)
        .then(data => {
          evt.target.classList.toggle('element__button_active');
          likesCounter.textContent = data.likes.length;
        })
        .catch(function(err) {
          console.log(`Ошибка ${err.status}`)
        })
    } else {
      activateLike(card._id)
        .then(data => {
          evt.target.classList.toggle('element__button_active');
          likesCounter.textContent = data.likes.length;
        })
        .catch(function(err) {
          console.log(`Ошибка ${err.status}`)
        })
    }
  });

  //Удаление
  const deleteButton = template.querySelector('.element__button-delete');
  if (userId !== card.owner._id) {
    deleteButton.classList.add('element__button-delete_disactive');
  } else {
    deleteButton.addEventListener('click', () => {
        deleteCard(card._id)
          .then(() => {
            template.remove();
          })
          .catch(function(err) {
            console.log(`Ошибка ${err.status}`)
          })
    });
  }
  image.addEventListener('click', () => openImage(card.name, card.link));
  return template;
}
