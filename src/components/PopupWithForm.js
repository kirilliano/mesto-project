import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, callbackSubmitForm) {
    super(selector);
    this.callbackSubmitForm = callbackSubmitForm;
    this.popupForm = this._popup.querySelector('.popup__form')
    this.saveButton = this.popupForm.querySelector('.popup__button')
    this.originalText = this.saveButton.value;
    this._submit = this._submit.bind(this);
  }

  _getInputValues() {
    this.inputList = this.popupForm.querySelectorAll('.popup__input')
    this._formValues = {};
    this.inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues;
  }

  _submit(evt) {
    evt.preventDefault()
    this.callbackSubmitForm(this._getInputValues())
  }

  _setEventListeners() {
    super._setEventListeners()
    this.popupForm.addEventListener('submit', this._submit)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this.popupForm.removeEventListener('submit', this._submit)
  }

  close() {
    super.close();
    this.popupForm.reset();
    this._removeEventListeners()
  }

  setButtonLoadingStatus(isLoading) {
    if (isLoading) {
      this.saveButton.value = 'Сохранение...'
    } else {
      this.saveButton.value = this.originalText
    }
  }
}

/** const profilePopup = new PopupWithForm('.popupProfile', callbackForm: ....) */
