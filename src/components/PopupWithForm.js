import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { submitButtonLabel, submitButtonAltLabel },
    handleFormSubmit
  ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector(".popup__form");
    this._buttonSubmit = this._form.querySelector(".form__button-submit");
    this._buttonSubmitLabel = submitButtonLabel;
    this._buttonSubmitAltLabel = submitButtonAltLabel;
    this._buttonSubmit.textContent = submitButtonLabel;
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = [...this._form.querySelectorAll(".popup__input")];

    inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  setSubmitHandler(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this);
    });

    super.setEventListeners();
  }

  showLoading() {
    this._buttonSubmit.textContent = this._buttonSubmitAltLabel;
  }

  hideLoading() {
    this._buttonSubmit.textContent = this._buttonSubmitLabel;
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
