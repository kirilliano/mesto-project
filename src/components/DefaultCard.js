class DefaultCard extends Card {
  constructor(data, selector) {
    super(data, selector);
  }

  _deleteCard() {
    delete super._deleteCard()
  }
}
