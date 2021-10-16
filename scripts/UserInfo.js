export default class UserInfo {
  constructor({nameSelector, specializationSelector}){
this._name =  document.querySelector(nameSelector);
this._specialization =   document.querySelector(specializationSelector);
  }
    getUserInfo(){
    const data={};
    data.name=this._name.textContent;
    data.specialization = this._specialization.textContent;

    return data;
    }
  setUserInfo(arr){

    this._name.textContent =arr[0];
    this._specialization.textContent=arr[1];
  }
  }