//Функция для шаблона запроса у сервера


// const config = {
//  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
//  headers: {
//    'Content-Type': 'application/json'
//    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
//  }

class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._headers = {
        'Content-Type': 'application/json',
        'authorization': token
    }
  }

  checkPromise(res) {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status);
    }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this.checkPromise);
  }

  getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this.checkPromise);
  }

  updateProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: { name: name, about: about }
    }).then(this.checkPromise);
  }

  addCardToServer(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: { name: name, link: link }
    }).then(this.checkPromise);
  }

  activateLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this.checkPromise);
  }

  disactivateLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this.checkPromise);
  }

  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this.checkPromise);
  }

  changeAvatar(link) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: { avatar: link }
    }).then(this.checkPromise);
  }
}
