export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handlePressEsc = this._handlePressEsc.bind(this)
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handlePressEsc(evt) {
    //evt.preventDefault()
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleCloseClick(evt) {
    if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close-button')
    ) {
      this.close()
    }
  };

  _setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleCloseClick);
    document.addEventListener("keydown", this._handlePressEsc);
  }

  _removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._handleCloseClick);
    document.removeEventListener("keydown", this._handlePressEsc);
  }
}
