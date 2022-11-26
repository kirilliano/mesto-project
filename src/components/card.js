//Класс карточки
export default class Card {
  constructor(data, userId, selector, { cardClick, cardDelete, cardLike }) {
    this._data = data;
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

    this._card = this._getElement();

    this.cardImage = this._card.querySelector(".element__image");
    this.likeButton = this._card.querySelector(".element__button");
    this.deleteButton = this._card.querySelector(".element__button-delete");
    this.likesCounter = this._card.querySelector(".element__likes-counter");
    this.cardName = this._card.querySelector(".element__title");
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //счетчик лайков и их состояние
  setLike(obj) {
    this._likes = obj.likes;
    this.likesCounter.textContent = this._likes.length;
    if (this._hasMyLike()) {
      this.likeButton.classList.add('element__button_active');
    } else {
      this.likeButton.classList.remove('element__button_active');
    }
  }

  //идентификация лайка
  _hasMyLike() {
    return this._likes.some((like) => like._id === this._userId);
  }

  //идентификация карточки и состояние кнопки удаления
  _delBtnState() {
    if (this._ownerId !== this._userId) {
      this.deleteButton.classList.add("element__button-delete_disactive");
    }
  }

  _setEventListeners() {
    this.deleteButton.addEventListener("click", () => {
      this._cardDelete(this._card, this._id);
    });

    this.cardImage.addEventListener("click", () => {
      this._cardClick({ name: this._name, link: this._link });
    });

    this.likeButton.addEventListener("click", () => {
      this._cardLike(this._hasMyLike(), this._id);
    });
  }

  generate() {
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardName.textContent = this._name;

    this.setLike(this._data);
    this._delBtnState();
    this._setEventListeners();

    return this._card;
  }
}
