class UserCard extends Card {
  constructor(data, selector) {
    super(data,selector);
  }
  deleteCard() {
    super._element.remove()

    super._setEventListeners()
  }
}
