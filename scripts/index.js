const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile-info__name");
const profileJob = profile.querySelector(".profile-info__job");
const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

const popup = document.querySelector(".popup");

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template-element").content;

const formsProperties = [
  {
    formHeadingVal: "Edit profile",
    formNameAttr: "form-edit-profile",
    inputFirstNameAttr: "name",
    inputFirstVal: "",
    inputFirstPlacehld: "",
    inputScndNameAttr: "job",
    inputScndVal: "",
    inputScndPlacehld: "",
    buttonSubmitVal: "Save",
    buttonSubmitAriaLbl: "save",
  },
  {
    formHeadingVal: "New place",
    formNameAttr: "form-new-place",
    inputFirstNameAttr: "title",
    inputFirstVal: "",
    inputFirstPlacehld: "Title",
    inputScndNameAttr: "image link",
    inputScndVal: "",
    inputScndPlacehld: "Image link",
    buttonSubmitVal: "Create",
    buttonSubmitAriaLbl: "create",
  },
];

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

generateInitialCards(initialCards);

function generateInitialCards(cardDataArray) {
  for (let index = 0; index < cardDataArray.length; index++) {
    generateCard(cardDataArray[index]);
  }
}

/************** Cards *******************/
function createCard(item) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__title");
  const cardButtonLike = cardElement.querySelector(
    ".element__button_action_like"
  );
  const cardButtonDelete = cardElement.querySelector(
    ".element__button_action_delete"
  );

  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardTitle.textContent = item.name;

  cardImage.addEventListener("error", () => {
    cardImage.src = "https://www.freeiconspng.com/uploads/no-image-icon-4.png";
    cardImage.alt = "no image available";
  });

  /* cardImage.addEventListener("click", handlePictureOpen); */

  cardButtonLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__button_action_like_active");
  });

  cardButtonDelete.addEventListener("click", function (evt) {
    const cardElement = cardButtonDelete.closest(".element");
    cardElement.remove();
  });

  return cardElement;
}

function generateCard(cardData) {
  const placeCard = createCard(cardData);
  cardContainer.prepend(placeCard);
}

/************** Cards *******************/

/* function createPopupContainer() {
  const containerTemplate = document.querySelector(
    "#template-popup-container"
  ).content;
  const containerElement = containerTemplate
    .querySelector(".popup__container")
    .cloneNode(true);
  const buttonPopupClose = containerElement.querySelector(
    ".popup__button-close"
  );

  buttonPopupClose.addEventListener("click", handlePopupClose);

  return containerElement;
}
 */
/* function createForm(formProperties, handleButtonSubmitFunc) {
  const containerElement = createPopupContainer();

  const formTemplate = document.querySelector("#template-popup-form").content;
  const formHeading = formTemplate
    .querySelector(".form__heading")
    .cloneNode(true);
  const formElement = formTemplate.querySelector(".form").cloneNode(true);
  const inputFirst = formElement.querySelector("#inputFirst");
  const inputScnd = formElement.querySelector("#inputScnd");
  const buttonSubmit = formElement.querySelector(".form__button-submit");

  containerElement.classList.add("popup__container_background-white");
  containerElement.classList.add("popup__container_bordered");

  formElement.name = formProperties.formNameAttr;
  formHeading.textContent = formProperties.formHeadingVal;

  inputFirst.name = formProperties.inputFirstNameAttr;
  inputFirst.value = formProperties.inputFirstVal;
  inputFirst.placeholder = formProperties.inputFirstPlacehld;

  inputScnd.name = formProperties.inputScndNameAttr;
  inputScnd.value = formProperties.inputScndVal;
  inputScnd.placeholder = formProperties.inputScndPlacehld;

  buttonSubmit.textContent = formProperties.buttonSubmitVal;
  buttonSubmit.ariaLabel = formProperties.buttonSubmitAriaLbl;

  formElement.addEventListener("submit", handleButtonSubmitFunc);

  containerElement.append(formHeading);
  containerElement.append(formElement);

  return containerElement;
}*/

/************** Edit profile form *******************/
/* function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputFirst.value;
  profileJob.textContent = inputScnd.value;

  handlePopupClose();
} */

/* function handleProfileFormOpen() {
  formsProperties[0].inputFirstVal = profileName.textContent;
  formsProperties[0].inputScndVal = profileJob.textContent;

  const containerElement = createForm(
    formsProperties[0],
    handleProfileFormSubmit
  );
  popup.append(containerElement);
  popup.classList.toggle("popup_opened");
} */
/************** Edit profile form *******************/

/*************** New place form ********************/
/* function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: inputFirst.value,
    link: inputScnd.value,
  };

  if (newCard.name === "") {
    newCard.name = "Untitled image";
  }

  generateCard(newCard);

  handlePopupClose();
} */

/* function handleAddPlaceFormOpen() {
  const containerElement = createForm(
    formsProperties[1],
    handleAddPlaceFormSubmit
  );
  popup.append(containerElement);
  popup.classList.toggle("popup_opened");
} */
/*************** New place form ********************/

/************** Popup Image *******************/
/* function createPopupImg(cardImageElement, cardTitleElement) {
  const containerElement = createPopupContainer();
  const buttonCloseElement = containerElement.querySelector(
    ".popup__button-close"
  );

  const popupImageTemplate = document.querySelector(
    "#template-popup-image"
  ).content;
  const popupImageElement = popupImageTemplate
    .querySelector(".popup-image")
    .cloneNode(true);
  const popupImageTitleElement = popupImageTemplate
    .querySelector(".popup-image__title")
    .cloneNode(true);

  buttonCloseElement.classList.add("popup__button-close_aside-img");

  popupImageElement.src = cardImageElement.src;
  popupImageElement.alt = cardImageElement.alt;
  popupImageTitleElement.textContent = cardTitleElement.textContent;

  containerElement.append(popupImageElement, popupImageTitleElement);

  return containerElement;
} */

/* function handlePictureOpen(evt) {
  const cardElement = evt.target.parentElement;
  const cardElementTitle = cardElement.querySelector(".element__title");

  const containerElement = createPopupImg(evt.target, cardElementTitle);
  popup.append(containerElement);
  popup.classList.toggle("popup_opened");
} */
/************** Popup Image *******************/

/* function handlePopupClose() {
  const popupChild = popup.firstElementChild;
  popupChild.remove();
  popup.classList.toggle("popup_opened");
} */

/* profileEditBtn.addEventListener("click", handleProfileFormOpen);
profileAddBtn.addEventListener("click", handleAddPlaceFormOpen); */
