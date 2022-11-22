const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('#username-field');
const jobInput = document.querySelector('#userinfo-field');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupEditProfile = document.querySelector('#popupEditProfile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const saveNewProfile = popupEditProfile.querySelector('#saveNewProfile');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
const profileAvatar = profileAvatarContainer.querySelector('.profile__avatar');

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
  }
}
export { profileEditButton, nameInput, jobInput, profileName, profileInfo, popupEditProfile,
  formEditProfile, saveNewProfile, config, profileAvatar, profileAvatarContainer }
