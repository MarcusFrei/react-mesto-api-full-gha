import { AUTH_BASE_URL } from "./apiConf";

class Auth {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return response.json();
  }

  register = (email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => this._checkResponse(response));
  };

  checkToken = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  };

  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => this._checkResponse(response));
  };
}

export const auth = new Auth(AUTH_BASE_URL);
