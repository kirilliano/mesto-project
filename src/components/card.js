//Класс карточки
export default class Card {
  constructor(data, userId, selector, { cardClick, cardDelete, cardLike }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._userId = userId;

    this._selector = selector;

    this._cardClick = cardClick;
    this._cardDelete = cardDelete;
    this._cardLike = cardLike;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }


/*
  _like() {
    this.likeButton.classList.add("element__button_active")
    this._setEventListeners()
  }

  _hasMyLike() {
    return this._likes.filter(like => like._id === this._userId);
  }

  _likesState() {
    if (this.likeButton.classList.contains('element__button_active')) {
      this.likeButton.classList.toggle('element__button_active')
      this.likesCounter.textContent = parseInt(this.likesCounter.textContent) - 1;
    } else {
      this.likeButton.classList.toggle('element__button_active')
      this.likesCounter.textContent = parseInt(this.likesCounter.textContent) + 1;
    }

    if (this._hasMyLike().length === 1) {
      this._like()
    }
  }
*/


_hasMyLike() {
  return _likes.some(function(like) {
    return like._id === userId;
  })
}

setLike() {
  if (this._hasMyLike()) {
    likeButton.classList.add('element__button_active');
  } else {
    likeButton.classList.remove('element__button_active');
  }
}

  _delBtnState() {
    if (this._ownerId !== this._userId) {
      this.deleteButton.classList.add('element__button-delete_disactive');
    }
  }
/*
  deleteCard() {
    this._card.remove()
  }
*/
  _setEventListeners() {
    this.deleteButton.addEventListener('click', () => {
      this._cardDelete(this._card, this._id)
    })

    this.cardImage.addEventListener('click', () => {
      this._cardClick({ name: this._name, link: this._link })
    })

    //this.likeButton.addEventListener('click', () =>
     // this._cardLike(this._hasMyLike(), this._id));
  }

  generate() {
    this._card = this._getElement();

    this.cardImage = this._card.querySelector(".element__image");
    this.likeButton = this._card.querySelector('element__button');
    this.deleteButton = this._card.querySelector('.element__button-delete');
    this.likesCounter = this._card.querySelector('.element__likes-counter');
    this.cardName = this._card.querySelector('.element__title');

    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardName.textContent = this._name;

    this._delBtnState();
    this._setEventListeners();
    //this.setLike();

    return this._card;
  }
}
