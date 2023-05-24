export default class UserInfo {
  constructor({ nameInfoElement, aboutInfoElement }) {
    this._name = nameInfoElement;
    this._info = aboutInfoElement;
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userAbout: this._info.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.work;
  }
}
