class PopupWithForm extends Popup {
  constructor(selector, callbackSubmitForm) {
    super(selector);
    this.callbackSubmitForm = callbackSubmitForm;
    this.popupForm = super._popup.querySelector('.popup__form')
    this.saveButton = this.popupForm.querySelector('.popup__button')
    this.originalText = this.saveButton.value
  }
  _getInputValues() {
    this.inputList = this.popupForm.querySelectorAll('.popup__input')
    this._formValues = {};
    this.inputList.forEach((input) => {
        this._formValues[input.name] = input.value
    })
    return this._formValues;
  }

  _submit() {
    evt.PreventDefault()
    this.callbackSubmitForm(this._getInputValues)
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
    this.popupForm.reset()
  }

  setButtonLoadingStatus(isLoading) {
    if (isLoading) {
      saveButton.value = 'Сохранение...'
  } else {
    saveButton.value = this.originalText
  }
  }
}

/** const profilePopup = new PopupWithForm('.popupProfile', callbackForm: ....) */
