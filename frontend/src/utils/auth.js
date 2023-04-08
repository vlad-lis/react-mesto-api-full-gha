// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://localhost:3000';

function renderResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    }).then(res => renderResponse(res));
};

export const signin = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    }).then(res => renderResponse(res));
};

export const signout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(res => renderResponse(res));
}

export const checkAuth = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(res => renderResponse(res));
};