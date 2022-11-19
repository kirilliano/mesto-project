class UserInfo {
  constructor({profileNameSelector, profileInfoSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileinfo.textContent,
    }
  }

  setUserInfo({name, about}) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
  }
}
