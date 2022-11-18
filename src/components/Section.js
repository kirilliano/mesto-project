class Section {
  constructor({ data, renderer }, selector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  render() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  setItems(element) {
    this._container.append(element)
  } 
}

// index.js
/*
const cardContainer = new Section({
  data: карточки,
  renderer: (item) => {
    const card = item.isOwner
      ? new UserCard(item, '.card-template_type_user')
      : new DefaultCard(item, '.card-template_type_default');

    const cardElement = card.generate();

    cardContainer.setItems(cardElement);
  },
},
  cardContainerSelector(импортированный из utils.js)
);
*/
