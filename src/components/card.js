//Класс карточки
class Card {
  constructor({ data }, userId, selector, { cardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._ownerId = data.owner._id;

    this._userId = userId;

    this._selector = selector;

    this.cardClick = cardClick
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _generate() {
    this._card = this._getElement();

    this.cardImage = this._card.querySelector(".element__image");
    this.likeButton = this._card.querySelector('element__button');
    this.deleteButton = this._card.querySelector('.element__button-delete')
    this.likesCounter = this._card.querySelector('.element__likes-counter')

    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardName.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _like() {
    this.likeButton.classList.add("element__button_active")
    this._setEventListeners()
  }

  _HasMyLike = () => {
    return this._likes.filter(like => like._id === this._userId);
  }

  _likesState() {
    if (this.likeButton.classList.contains('element__button_active')) {
      likeButton.classList.toggle('element__button_active')
      likesCount.textContent = parseInt(this.likesCounter.textContent) - 1;
    } else {
      likeButton.classList.toggle('element__button_active')
      likesCount.textContent = parseInt(this.likesCounter.textContent) + 1;
    }

    if (this._likeMyId().length === 1) {
      this._like()
    }
  }

  _delBtnState() {
    if (this._ownerId !== this._userId) {
      this.deleteButton.classList.add('element__button-delete_disactive')
    }
  }

  _deleteCard() {
    this._card.remove()
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._like()
    })

    this.deleteButton.addEventListener('click', () => {
      this._deleteCard()
    })

    this.cardImage.addEventListener('click', () => { this.cardClick({ name: this._name, link: this._link }) })
  }
}
