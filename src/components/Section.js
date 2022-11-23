export default class Section {
  constructor({ items, renderer }, selector) {
    this.rendererItems = items
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
