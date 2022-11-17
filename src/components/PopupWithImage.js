class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open({link, text}) {
        super.open();
        this.element.src = link;
        this.element.textContent = text;
    }
}
