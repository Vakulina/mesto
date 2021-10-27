export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(`Извините! Произошла ошибка:${res.statusText}`)
    }
  }

  _showError(err) {
    console.log(err)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkRequest)
    .catch(this._showError)
  }

  getInfoUserOfServ() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(this._showError)
  }

  setNewUserInfo(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: body,
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(this._showError)
  }
}

