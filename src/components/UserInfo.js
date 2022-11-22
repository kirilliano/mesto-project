export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, profileAvatarSelector }) {
    this._profileNameSelector = profileNameSelector;
    this._profileInfoSelector = profileInfoSelector;
    this._profileAvatarSelector = profileAvatarSelector

    this._profileName = document.querySelector(this._profileNameSelector);
    this._profileInfo = document.querySelector(this._profileInfoSelector);
    this._profileAva = document.querySelector(this._profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileInfo.textContent,
    }
  }

  setUserInfo({ data }) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.about;
    this._profileAva.src = data.avatar;
    this.userId = data._id;
  }
}

/**index.js
  const userInfo = new UserInfo({
  userNameSelector,
  userCaptionSelector,
  userAvatarSelector
}); */
