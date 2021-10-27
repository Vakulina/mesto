export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    // ...
  }

  getInfoUserOfServ() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(`Извините! Произошла ошибка:${res.statusText}`)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  
  setNewUserInfo(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: body,
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Извините! Произошла ошибка:${res.statusText}`)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
}

