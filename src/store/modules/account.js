import * as api from "../../config/api"
import * as TYPE from "../../config/mutation-types"

const state = {
    token: {
        accessToken: "",
        refreshToken: ""
    },
    user: {
        id: -1,
        name: "",
        email: "",
        regDate: "",
        modDate: "",
        age: "",
        role: "",
        uuid: ""
    }
}

// getters
const getters = {
    token: state => state.token,
    user: state => state.user
}


// actions
const actions = {
    async [TYPE.LOGIN](context, user) {
        try {
            const result = await api.login(user);
            console.log("login success and data : ", result.data);
            context.commit(TYPE.LOGIN, result.data);
            return 200;
        } catch (e) {
            console.error("actions > login >login error : ", e.response.data);
            if (e.response.data.code === "4012") {
                console.error("actions > LOGIN > user not found");
                return 404;
            }
            if (e.response.data.code === "3001") {
                console.error("actions > LOGIN > password not valid");
                return 400;
            }
            return 500;
        }
    },
    async [TYPE.GET_USER](context) {
        try {
            console.log("access token is ", state.token.accessToken)
            const result = await api.getUser(state.token.accessToken);
            console.log("get user success and data : ", result.data);
            context.commit(TYPE.GET_USER, result.data);
            return 200;
        } catch (e) {
            console.error("actions > getuser > error : ", e.response.data);
            if (e.response.data.code === "4012") {
                console.error("actions > getuser > token expired");
                return 401;
            }
            return 500;
        }
    },
    [TYPE.SET_TOKEN](context, payload) {
        context.commit(TYPE.SET_TOKEN, payload);
    },
    async [TYPE.REFRESH_TOKEN](context) {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                return 4404;
            }
            const result = await api.getAccessTokenByRefresh(refreshToken);
            context.commit(TYPE.SET_TOKEN, result.data);
            return 200;
        } catch (e) {
            console.error("actions > REFRESH_TOKEN > error : ", e.response.data);
            if (e.response.data.code === "4012") {
                console.error("actions > REFRESH_TOKEN > token expired");
                return 401;
            }
            if (e.response.data.code === "3000") {
                console.error("actions > REFRESH_TOKEN > user not found");
                return 404;
            }
            return 500;
        }
    },
    async [TYPE.CHANGE_MY_INFO](context, payload) {
        try {
            const result = await api.changeMyInfo({
                token: state.token.accessToken,
                user: payload
            });
            context.commit(TYPE.CHANGE_MY_INFO, result.data);
            return 200;
        } catch (e) {
            if (e.response.data.code === "4012") {
                console.error("actions > REFRESH_TOKEN > token expired");
                return 401;
            }
            if (e.response.data.code === "3000") {
                console.error("actions > REFRESH_TOKEN > user not found");
                return 404;
            }
            return 500;
        }
    }
}

// mutations
const mutations = {
    [TYPE.LOGIN](state, payload) {
        console.log("mutation called")
        state.token.accessToken = payload.accessToken
        state.token.refreshToken = payload.refreshToken
    },
    [TYPE.GET_USER](state, payload) {
        console.log("mutation called")
        state.user = payload;
    },
    [TYPE.SET_TOKEN](state, payload) {
        console.log("mutation called")
        state.token.accessToken = payload.accessToken
        state.token.refreshToken = payload.refreshToken
        localStorage.setItem("token", payload.accessToken)
        localStorage.setItem("refreshToken", payload.refreshToken)
    },
    [TYPE.LOGOUT](state) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        state.token.accessToken = "";
        state.token.refreshToken = "";
        state.user = {
            id: -1,
            name: "",
            email: "",
            regDate: "",
            modDate: "",
            age: "",
            role: "",
            uuid: ""
        }
    },
    [TYPE.CHANGE_MY_INFO](state, payload) {
        state.user = payload;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}