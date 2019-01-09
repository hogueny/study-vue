import * as axios from "axios";

const baseURL = "http://localhost:3031";


// for account 
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

// for board admin
// params: {name: string, token: string}
export function createBoard(params) {
    return axios.post(`${baseURL}/boards`, {
        name: params.name === undefined ? "" : params.name
    }, {
            headers: {
                "Authorization": params.token,
                "Content-Type": "application/json"
            }
        });
}

// params: {boardId: number, name: string, token: string}
export function updateBoard(params) {
    return axios.put(`${baseURL}/boards/${params.boardId}`, {
        name: params.name === undefined ? "" : params.name
    }, {
            headers: {
                "Authorization": params.token,
                "Content-Type": "application/json"
            }
        });
}

// params: {boardId: number}
export function removeBoard(params) {
    return axios.delete(`${baseURL}/boards/${params.boardId}`, {
        headers: {
            "Authorization": params.token,
            "Content-Type": "application/json"
        }
    });
}

export function getBoards() {
    return axios.get(`${baseURL}/boards`);
}

// board message ///
// params: {boardId : number, title : string, contents : string, token : string}
export function createMessage(params){
    return axios.post(`${baseURL}/message`,{
        title : params.title === undefined ? "" : params.title,
        contents : params.contents === undefined ? "" : params.contents,
        boardId : params.boardId === undefined ? "" : params.boardId
    },
       {
            headers: {
                "Authorization": params.token,
                "Content-Type": "application/json"
            }
        });
}

// params: {token : string}
export function getUserMessages(params){
    return axios.get(`${baseURL}/message`,
    {
        headers: {
            "Authorization": params.token,
            "Content-Type": "application/json"
        }
    });
}
// params: {messageId : number, boardId : number, title : string, contents, string}
export function updateMessage(params){
    return axios.put(`${baseURL}/message/${params.messageId}`, {
        boardId: params.boardId === undefined ? "" : params.boardId,
        title: params.title === undefined ? "" : params.title,
        contents : params.contents === undefined ? "" : params.contents
    }, {
             headers: {
                "Authorization": params.token,
                "Content-Type": "application/json"
             }
        });
}

// params : {messageId : number, token : string}
export function removeMessage(params) {
    return axios.delete(`${baseURL}/message/${params.messageId}`, {
        headers : {
            "Authorization": params.token,
            "Content-Type": "application/json"
        }
    });
}
/*
export function getBoardsMessages(params){
    return axios.get(`${baseURL}/message/${params.boardId}/messages`);
}
*/