export default class UserInfo {
  constructor({ nameSelector, specializationSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._specification = document.querySelector(specializationSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.about = this._specification.textContent;
    return data;
  }


  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._specification.textContent = about;

  }
  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}