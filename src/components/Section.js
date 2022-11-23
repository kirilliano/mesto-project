export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  render(renderedItems) {
    renderedItems.forEach(item => this.setItems(item))
    console.log('no ren errors')
  }

  setItems(cardElement) {
    this._container.prepend(this._renderer(cardElement));
    console.log('no set errors')
  }
}

// index.js
/*
const cardContainer = new Section({
  data: ссылка на объект из карточек,
  renderer: (item) => {
    const card = createCard(item)

    const cardElement = card.generate();

    cardContainer.setItems(cardElement);
  },
},
  '.cardContainerSelector'
);
*/
