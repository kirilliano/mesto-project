const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
    'Content-Type': 'application/json'
  }
}

//Функция для шаблона запроса у сервера
function fetchServerData(path, method = "GET", body = null) {
  const fetchSettings = {
    method: method,
    headers: config.headers
  }

  if (body) {
    fetchSettings.body = JSON.stringify(body)
  }

  return fetch(`${config.baseUrl}/${path}`, fetchSettings)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status);
    });
}

//Получение информации о карточках на сервере
export function getInitialCards() {
  return fetchServerData("cards")
}

//Получение информации о пользователе с сервера
export function getUserData() {
  return fetchServerData("users/me")
}

//Запрос на обновление информации о пользователе на сервере
export function updateProfile(name, about) {
  return fetchServerData("users/me", "PATCH", { name: name, about: about });
}

//Добавление новой карточки на сервер
export function addCardToServer(name, link) {
  return fetchServerData("cards", "POST", { name: name, link: link });
}

//Зафиксировать на сервере активный лайк
export function activateLike(cardId) {
  return fetchServerData(`cards/likes/${cardId}`, 'PUT');
}

//Зафиксировать на сервере снятие лайка
export function disactivateLike(cardId) {
  return fetchServerData(`cards/likes/${cardId}`, 'DELETE');
}

//Запрос на удаление карточки с сервера
export function deleteCard(id) {
  return fetchServerData(`cards/${id}`, 'DELETE');
}

//Запрос на изменение аватара
export function changeAvatar(link) {
  return fetchServerData('users/me/avatar', 'PATCH', { avatar: link });
}


// const api = new Api(config)
// const config = {
//  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
//  headers: {
//    'Content-Type': 'application/json'
//    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
//  }

class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  getServerData(path, method, body = null) {
    this.path = path;
    this.method = method;
    this.body = body

    const fetchSettings = {
      method: method,
      headers: this._headers
    }

    if (body) {
      fetchSettings.body = JSON.stringify(body)
    }

    return fetch(`${this._baseUrl}/${path}`, fetchSettings)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      });
  }

  getInitialCards() {
    return this.getServerData('cards', "GET")
  }

  getUserData() {
    return this.getServerData("users/me", "GET")
  }

  updateProfile(name, about) {
    return getServerData("users/me", "PATCH", { name: name, about: about });
  }

  addCardToServer(name, link) {
    return getServerData("cards", "POST", { name: name, link: link });
  }

  activateLike(cardId) {
    return getServerData(`cards/likes/${cardId}`, 'PUT');
  }

  disactivateLike(cardId) {
    return getServerData(`cards/likes/${cardId}`, 'DELETE');
  }

  deleteCard(id) {
    return getServerData(`cards/${id}`, 'DELETE');
  }

  changeAvatar(link) {
    return getServerData('users/me/avatar', 'PATCH', { avatar: link });
  }

}
