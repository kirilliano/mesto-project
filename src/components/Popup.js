export default class Popup {
  constructor(selector) {
		this._popup = document.querySelector(selector);
    this.popups = document.querySelectorAll('.popup');
    this._handlePressClick = this._handlePressClick.bind(this)
	}

	open() {
		this._popup.classList.add("popup_opened");
		this._setEventListeners();
	}

	close() {
		this._popup.classList.remove("popup_opened");
		this._removeEventListeners();
	}

	_handlePressEsc = (evt) => {
		evt.preventDefault()
		if (evt.key === "Escape") {
			this.close();
		}
	};

	_handleCloseClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close()
    }
	};

	_setEventListeners() {
		this._popup.addEventListener("mousedown", this._handlePressClick);
		document.addEventListener("keydown", this._handlePressEsc);
    //добавить esc close
	}

  _removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._handlePressClick);
		document.removeEventListener("keydown", this._handlePressEsc);
  }
}
