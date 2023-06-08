export default class UserInfo {
  constructor({ nameInfoElement, aboutInfoElement, avaratInfoElement }) {
    this._name = nameInfoElement;
    this._info = aboutInfoElement;
    this._avatar = avaratInfoElement;
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userAbout: this._info.textContent,
      avaratInfoElement: this._avatar.link,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
