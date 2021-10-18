export default class UserInfo {
  constructor({ nameSelector, specializationSelector }) {
    this._name = document.querySelector(nameSelector);
    this._specification = document.querySelector(specializationSelector);
  }
  
  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.specification = this._specification.textContent;
    console.log(data)
    return data;
  }

  setUserInfo({name, specification} ) {
    this._name.textContent = name;
    this._specification.textContent = specification;
  }
}