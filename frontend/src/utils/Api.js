class Api {
    constructor({ link, headers }) {
        this._link = link;
        this._headers = headers;
    }

    _renderResult(result) {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(result.status);
    }

    getDefaultCards() {
        return fetch(`${this._link}/cards`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(cards => this._renderResult(cards))
    }

    getUserInfo() {
        return fetch(`${this._link}/users/me`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(info => this._renderResult(info))

    }

    editUserProfile(newInfo) {
        return fetch(`${this._link}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(newInfo),
            credentials: 'include',
        })
            .then(info => this._renderResult(info))
    }

    addNewCard(cardData) {
        return fetch(`${this._link}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData),
            credentials: 'include',
        })
            .then(card => this._renderResult(card))
    }

    deleteCard(cardId) {
        return fetch(`${this._link}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._renderResult(res))
    }


    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this._link}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers,
                credentials: 'include',
            })
                .then(like => this._renderResult(like))
        } else {
            return fetch(`${this._link}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers,
                credentials: 'include',
            })
                .then(like => this._renderResult(like))
        }
    }

    editAvatar(newAvatar) {
        return fetch(`${this._link}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(newAvatar),
            credentials: 'include',
        })
            .then(res => this._renderResult(res))
    }
}

const api = new Api({
    link: 'http://localhost:3000',
    headers: {
        // authorization: 'b4e5eaca-bb60-4b52-a5a4-33fbaf439073',
        'Content-Type': 'application/json'
    },
    // credentials: 'include',
});

export default api;