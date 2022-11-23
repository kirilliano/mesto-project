import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._popupImage = this._popup.querySelector('.popup__image')
        this._popupImgCaption = this._popup.querySelector('.popup__image-caption')
    }

    open(data) {
        super.open();

        this._popupImage.src = data.link;
        this._popupImage.alt = data.name
        this._popupImgCaption.textContent = data.name;
    }
}
