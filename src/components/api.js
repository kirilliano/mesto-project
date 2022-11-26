//Функция для шаблона запроса у сервера

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkPromise(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
    return this.checkPromise(res);
  }

  async getUserData() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
    return this.checkPromise(res);
  }

  async updateProfile(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.UserName, about: data.UserInfo })
    });
    return this.checkPromise(res);
  }

  async addCardToServer(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: data.PhotoTitle, link: data.PhotoLink })
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
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: link.avatarUrl })
    });
    return this.checkPromise(res);
  }

  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()])
  }
}
