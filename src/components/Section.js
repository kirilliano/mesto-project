export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector)
  }

  render() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  setItems(cardElement) {
    this._container.append(cardElement);
  }
}
