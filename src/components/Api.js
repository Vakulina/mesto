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
/*
  _showError(err, text) {
    console.log(err)
  }
*/
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkRequest)
    .catch(err => console.log(`Ошибка загрузки данных с сервера: ${err}`))
  }

  getInfoUserOfServ() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка загрузки профайла: ${err}`))
  }

  setNewUserInfo(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: body,
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка сохранения: ${err}`))
  }

  setNewCard(body){
    return fetch (`${this._url}/cards`,{
      method: 'POST',
      body: JSON.stringify(body),
      headers: this._headers,
    })
    .then(this._checkRequest)
    .catch(err => console.log(`Ошибка сохранения: ${err}`))
  }
  setLike(cardId){
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
  }
  deleteLike(cardId){
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
  }
 

  likeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
  }
  setAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(avatar),
      headers: this._headers,
    })
      .then(this._checkRequest)
      .catch(err => console.log(`Ошибка сохранения аватара: ${err}`))
}
getAvatarFromServ(){
  return fetch(`${this._url}/users/me`, {
    method: 'GET',
    headers: this._headers,
  })
    .then(this._checkRequest)
    .catch(err => console.log(`Ошибка загрузки профайла: ${err}`))
}
}

