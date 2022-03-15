class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(popupSelector);
  }

  _getTemplate() {}

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener("click", this._handleOverlayClick);
  }
}

export { open, close, setEventListeners };
