import * as axios from "axios";

const baseURL = "http://localhost:3031";

export function login(user) {
    return axios.post(`${baseURL}/users/login`, {
        email: user.email === undefined ? "" : user.email,
        password: user.password === undefined ? "" : user.password
    });
}

export function getUser(token) {
    return axios.get(`${baseURL}/users/me`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });
}

export function createUser(user) {
    return axios.post(`${baseURL}/users`, user);
}

export function modifyUser(user, token) {
    return axios.put(`${baseURL}/users`, user, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });
}

export function removeUser(token) {
    return axios.delete(`${baseURL}/users`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });
}

export function getAccessTokenByRefresh(refreshToken) {
    return axios.get(`${baseURL}/users/refresh`, {
        headers: {
            "Authorization": refreshToken,
            "Content-Type": "application/json"
        }
    });
}


export function changeMyInfo(params) {
    return axios.patch(`${baseURL}/users/me`, params.user, {
        headers: {
            "Authorization": params.token,
            "Content-Type": "application/json"
        }
    });
}