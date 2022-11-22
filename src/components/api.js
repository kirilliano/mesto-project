//Функция для шаблона запроса у сервера


// const config = {
//  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
//  headers: {
//    'Content-Type': 'application/json'
//    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
//  }
//создать объект config в utils

export default class Api {
  constructor({baseUrl, token}) {
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

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    });
    return this.checkPromise(res);
  }

  async getUserData() {
      const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
    return this.checkPromise(res);
  }

  async updateProfile(name, about) {
      const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: { name: name, about: about }
    });
    return this.checkPromise(res);
  }

  async addCardToServer(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: { name: name, link: link }
    });
    return this.checkPromise(res);
  }

  async activateLike(cardId) {
      const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this.checkPromise(res);
  }

  async disactivateLike(cardId) {
      const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this.checkPromise(res);
  }

  async deleteCard(cardId) {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this.checkPromise(res);
  }

  async changeAvatar(link) {
      const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'PATCH',
      headers: this._headers,
      body: { avatar: link }
    });
    return this.checkPromise(res);
  }
}
