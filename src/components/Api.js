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
      return Promise.reject(res.statusText)
    }
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkRequest)
  }

  getInfoUserOfServ() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkRequest)
  }

  setNewUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({ name: data.name, about: data.about }),
      headers: this._headers,
    })
      .then(this._checkRequest)
  }

  setNewCard(body) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this._headers,
    })
      .then(this._checkRequest)
  }
  likeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
  }
  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(avatar),
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка сохранения аватара: ${err}`))
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkRequest)
  }
}

