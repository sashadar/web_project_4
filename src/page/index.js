import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../utils/Api";

import {
  validationSettings,
  userInfoSelectors,
  popupSelectors,
  cardSectionSelector,
  formEditProfile,
  formAddCard,
  formEditProfileInputName,
  formEditProfileInputJob,
  formEditAvatar,
  formEditAvatarInputLink,
  apiSettings,
  popupFormSaveButtonLabels,
  popupFormDeleteButtonLabels,
  popupFormCreateButtonLabels,
} from "../utils/constants.js";

import "./index.css";

let userId = "";
const api = new Api({
  serverUrl: apiSettings.serverUrl,
  groupId: apiSettings.groupId,
  token: apiSettings.token,
});

const profile = document.querySelector(".profile");

const profileEditBtn = profile.querySelector(".profile-info__button-edit");
const profileAddBtn = profile.querySelector(".profile__button-add");

const profileEditAvatarBtn = profile.querySelector(".avatar");

const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.nameselector,
  jobSelector: userInfoSelectors.jobSelector,
  avatarSelector: userInfoSelectors.avatarSelector,
});

const popupWithImage = new PopupWithImage(popupSelectors.popupWithImage);

const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const popupConfirm = new PopupWithForm(popupSelectors.popupConfirm, {
  submitButtonLabel: popupFormDeleteButtonLabels.submitButtonLabel,
  submitButtonAltLabel: popupFormDeleteButtonLabels.submitButtonAltLabel,
});
popupConfirm.setEventListeners();

const createCard = (cardData, userId) => {
  const newCardObject = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      id: cardData._id,
      likes: cardData.likes,
      ownerId: cardData.owner._id,
      templateSelector: "#template-element",
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleDeleteCard: (id) => {
        popupConfirm.open();
        popupConfirm.setSubmitHandler(() => {
          popupConfirm.showLoading();
          api
            .removeCard(id)
            .then(() => {
              newCardObject.removeElement();
              popupConfirm.close();
            })
            .catch((err) => console.log(`Error:     ${err}`))
            .finally(() => popupConfirm.hideLoading());
        });
      },
      handleLikeClick: (id) => {
        if (
          newCardObject.elementButtonLike.classList.contains(
            "element__button_action_like_active"
          )
        ) {
          api
            .removeLike(id)
            .then((cardData) => {
              newCardObject.updateLikes(cardData.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(id)
            .then((cardData) => {
              newCardObject.updateLikes(cardData.likes);
            })
            .catch((err) => console.log(err));
        }
      },
    },
    userId
  );

  return newCardObject.generateCard();
};

const handleEditProfileFormSubmit = (formInputValues, editProfileForm) => {
  editProfileForm.showLoading();
  return api
    .setUserData({
      name: formInputValues.name,
      about: formInputValues.job,
    })
    .then((userDataResponse) => {
      userInfo.setUserInfo({
        name: userDataResponse.name,
        job: userDataResponse.about,
        avatar: userDataResponse.avatar,
      });
      editProfileForm.close();
    })
    .catch((err) => console.log(`Error:     ${err}`))
    .finally(() => {
      editProfileForm.hideLoading();
    });
};

const handleEditAvatarFormSubmit = (formInputValues, editAvatarForm) => {
  editAvatarForm.showLoading();
  return api
    .setUserAvatar(formInputValues.link)
    .then((userDataResponse) => {
      userInfo.setUserInfo({
        name: userDataResponse.name,
        job: userDataResponse.about,
        avatar: userDataResponse.avatar,
      });
      editAvatarForm.close();
    })
    .catch((err) => console.log(`Error:     ${err}`))
    .finally(() => {
      editAvatarForm.hideLoading();
    });
};

const popupEditProfile = new PopupWithForm(
  popupSelectors.popupEditProfile,
  {
    submitButtonLabel: popupFormSaveButtonLabels.submitButtonLabel,
    submitButtonAltLabel: popupFormSaveButtonLabels.submitButtonAltLabel,
  },
  handleEditProfileFormSubmit
);

const popupEditAvatar = new PopupWithForm(
  popupSelectors.popupEditAvatar,
  {
    submitButtonLabel: popupFormSaveButtonLabels.submitButtonLabel,
    submitButtonAltLabel: popupFormSaveButtonLabels.submitButtonAltLabel,
  },
  handleEditAvatarFormSubmit
);

const fillProfileForm = () => {
  const info = userInfo.getUserInfo();
  formEditProfileInputName.value = info.name;
  formEditProfileInputJob.value = info.job;
};

const handleEditProfileOpen = () => {
  fillProfileForm();
  formValidators[formEditProfile.getAttribute("name")].resetInputValidation();
  popupEditProfile.open();
};

const handleEditAvatarOpen = () => {
  formValidators[formEditAvatar.getAttribute("name")].resetInputValidation();
  popupEditAvatar.open();
};

api.setup();
api
  .getInitialData()
  .then(([userData, initialCardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    const cardList = new Section(
      {
        items: initialCardsData,
        renderer: (item) => {
          const cardElement = createCard(item, userData._id);
          cardList.addItem(cardElement);
        },
      },
      cardSectionSelector
    );

    cardList.renderItems();
    userId = userData._id;

    const handleAddCardFormSubmit = (data, addCardForm) => {
      addCardForm.showLoading();
      api
        .addNewCard({ name: data.title, link: data.link })
        .then((cardData) => {
          const newCard = createCard(cardData, userId);
          cardList.addItem(newCard);
          addCardForm.close();
        })
        .catch((err) => {
          console.log(`Error:     ${err}`);
        })
        .finally(() => {
          addCardForm.hideLoading();
        });
    };

    const popupAddCard = new PopupWithForm(
      popupSelectors.popupAddCard,
      {
        submitButtonLabel: popupFormCreateButtonLabels.submitButtonLabel,
        submitButtonAltLabel: popupFormCreateButtonLabels.submitButtonAltLabel,
      },
      handleAddCardFormSubmit
    );

    const handleAddCardFormOpen = () => {
      formAddCard.reset();
      formValidators[formAddCard.getAttribute("name")].resetInputValidation();
      popupAddCard.open();
    };

    popupAddCard.setEventListeners();

    profileAddBtn.addEventListener("click", handleAddCardFormOpen);
  })
  .catch((err) => console.log(`Error:     ${err}`));

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();

enableValidation(validationSettings);

profileEditBtn.addEventListener("click", handleEditProfileOpen);
profileEditAvatarBtn.addEventListener("click", handleEditAvatarOpen);
