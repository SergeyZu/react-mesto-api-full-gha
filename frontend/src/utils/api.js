class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  // Запрос на получение данных пользователя
  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // Запрос на изменение данных пользователя
  setUserData(inputValues) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(inputValues),
    });
  }

  // Запрос на получение массива всех карточек
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Запрос на добавление карточки
  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  // Запрос на удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  // Запрос на постановку лайка
  setLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  // Запрос на снятие лайка:
  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  // Запрос на обновление аватара
  changeAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}

const apiConfig = {
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.zinchenko.nomoredomains.rocks',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};

// const apiConfig = {
//   baseUrl: "https://nomoreparties.co/v1/cohort-61",
//   headers: {
//     authorization: "e4cf1203-298c-4ad3-b815-4ccead265bb8",
//     "Content-Type": "application/json",
//   },
// };

const api = new Api(apiConfig);

export { api };
