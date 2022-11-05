const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: 'bb462bb4-22b0-43a6-bcbf-709edef952c3',
    'Content-Type': 'application/json'
  }
}

//Функция для шаблона запроса у сервера
function fetchServerData (path, method = "GET", body = null) {
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
  return fetchServerData('users/me/avatar', 'PATCH', {avatar: link});
}
