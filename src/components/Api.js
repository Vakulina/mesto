export class Api {
  constructor(config) {
   this._url=config.url;
   this._headers=config.headers;
   this._metod = config.metod;
   this._body= config.body;
  }

  getInitialCards() {
    // ...
  }
  getInfoUser(){
    return fetch(this._url, {
     metod: this._metod,
    headers: this._headers
    }).then((res)=>{
      if (res.ok){
      return res.json()
      }
      else{
        return Promise.reject(`Извините! Произошла ошибка:${res.status}`)
      }
    }).then()
    .catch((err)=>{
      console.log(err)
    })
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '1b533183-cd0b-49d7-a8aa-3f93cdc1c349',
    'Content-Type': 'application/json'
  }
}); 