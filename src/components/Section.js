export default class Section {
  constructor({ data, renderer }, selector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  render() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  setItems(cardElement) {
    this._container.prepend(this.render(cardElement))
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
