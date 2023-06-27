// const BASE_URL = 'http://104.131.160.75:3000';

// const BASE_URL = 'https://auth.nomoreparties.co';

// const BASE_URL = 'http://localhost:3000';

const BASE_URL = 'https://api.zinchenko.nomoredomains.rocks';

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // const token = localStorage.getItem('token');

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${BASE_URL}${url}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка. Код ${response.status}`);
  });
};

const register = (email, password) => {
  return makeRequest('/signup', 'POST', { email, password }, null);
};

const authorize = (email, password) => {
  return makeRequest('/signin', 'POST', { email, password }, null);
};

const getUserData = (token) => {
  return makeRequest('/users/me', 'GET', null, token);
};

export { BASE_URL, register, authorize, getUserData };
