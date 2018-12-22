import * as api from "../../config/api"
import * as TYPE from "../../config/mutation-types"

const state = {
    token: {
        accessToken: "",
        refreshToken: ""
    },
    user: {
        idx: -1,
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
    async [TYPE.LOGIN] (context, user) {
        try {
            const result = await api.login(user);
            if (result.status !== 200) {
                console.error("login error : ", result);
                return false;
            }
            console.log("login success and data : ", result.data);
            context.commit(TYPE.LOGIN, result.data);
            return true;
        } catch (e) {
            console.error("actions > login >login error : ", e);
            return false;
        }
    },
    async [TYPE.GET_USER](context) {
        try {
            console.log("access token is ", state.token.accessToken)
            const result = await api.getUser(state.token.accessToken);
            if (result.status !== 200) {
                console.error("get user error : ", result);
                return false;
            }
            console.log("get user success and data : ", result.data);
            context.commit(TYPE.GET_USER, result.data);
            return true;
        } catch (e) {
            console.error("actions > getuser > error : ", e);
            return false;
        }
    },
    [TYPE.SET_TOKEN](context, payload) {
        context.commit(TYPE.SET_TOKEN, payload);
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}