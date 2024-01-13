import { apiConfig } from "./apiConf";

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return response.json();
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`} }).then(
      (response) => this._checkResponse(response)
    );
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`} }).then(
      (response) => this._checkResponse(response)
    );
  }

  editProfile(info) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then((response) => this._checkResponse(response));
  }

  sendNewCard(info) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({
        name: info.name,
        link: info.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`},
    }).then((response) => this._checkResponse(response));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`},
    }).then((response) => this._checkResponse(response));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`},
    }).then((response) => this._checkResponse(response));
  }

  updateAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {...this._headers, authorization:`Bearer ${localStorage.getItem('jwt')}`},
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then((response) => this._checkResponse(response));
  }
}

export const api = new Api(apiConfig);
