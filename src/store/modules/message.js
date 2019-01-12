import _ from "underscore";
import * as api from "../../config/api";
import * as TYPE from "../../config/mutation-types";

const state = {
    message: {
        id: -1,
        title: "",
        content: "",
        regDate: "",
        modDate: "",
        boardId: "",
        userId: ""
    },
    messages: []
}

// getters
const getters = {
    message: state => state.message,
    messages: state => state.messages
}


// actions
const actions = {
    async [TYPE.CREATE_MESSAGE](context,params) {
    try{    
        console.log(`boardId : ${params.boardId}`);
        console.log(`title : ${params.title}`);
        console.log(`contents : ${params.contents}`);

        const token = localStorage.getItem("token");
        if(!token || token === ""){
            return 401;
        }
        const result = await api.createMessage({
            boardId : params.boardId,
            title : params.title,
            contents : params.contents,
            token : token
        });
        context.commit(TYPE.CREATE_MESSAGE, result.data);
        return 201;
    } catch (e) {
        console.error("actions > CREATE_MESSAGE > error : ", e.response.data);
        if (e.response.data.code === "4012" || e.response.data.code === "4008") {
            console.error("actions > CREATE_MESSAGE > user not found");
            return 404;
        }
        if (e.response.data.code === "3001") {
            console.error("actions > CREATE_MESSAGE > title min 3 max 30");
            console.error("actions > CREATE_MESSAGE > contents string");
            console.error("actions > CREATE_MESSAGE > boardID is number and requeired");
            return 400;
        }

        if (e.response.data.code === "4001") {
            console.error("actions > CREATE_MESSAGE > user role not permitted");
            return 4001;
        }
        return 500;
        }
    },

    // getMessageByUserId
    async [TYPE.GET_MESSAGE](context) {
        try {
            const token = localStorage.getItem("token");
            if (!token || token === "") {
                return 401;
            }
            const result = await api.getUserMessages({token: token});
            context.commit(TYPE.SET_MESSAGES, result.data);
            return 200;
        } catch (e) {
            console.error("GET_MESSAGES error : ", e);
            return 500;
        }
    },
    async [TYPE.UPDATE_MESSAGE](context, params) {
        try {
            console.log(`boardId : ${params.boardId}`);
            console.log(`messageId : ${params.messageId}`);
            console.log(`title : ${params.title}`);
            console.log(`contents : ${params.contents}`);
            const token = localStorage.getItem("token");
            if (!token || token === "") {
                return 401;
            }
            const result = await api.updateMessage(
                {  
                    messageId : params.messageId,
                    boardId: params.boardId,
                    title: params.title, 
                    contents : params.contents, 
                    token: token 
                });
            context.commit(TYPE.UPDATE_MESSAGE, result.data);
            return 200;
        } catch (e) {
            console.error("actions > UPDATE_MESSAGE > error : ", e.response.data);
            if (e.response.data.code === "4012" || e.response.data.code === "4008") {
                console.error("actions > UPDATE_MESSAGE > user or board not found");
                return 404;
            }
            if (e.response.data.code === "3001") {
                console.error("actions > CREATE_MESSAGE > name min 3");
                return 400;
            }

            if (e.response.data.code === "4001") {
                console.error("actions > CREATE_MESSAGE > user role not permitted");
                return 4001;
            }
            return 500;
        }
    },
    async [TYPE.DELETE_MESSAGE](context, messageId) {
        try {
            console.log(`messageId : ${messageId}`)
            const token = localStorage.getItem("token");
            if (!token || token === "") {
                return 401;
            }
            const result = await api.removeMessage({messageId: messageId, token: token});
            context.commit(TYPE.DELETE_MESSAGE, messageId);
            return 204;
        } catch (e) {
            console.error("DELETE_MESSAGE error : ", e);
            console.error("actions > DELETE_MESSAGE > error : ", e.response.data);
            if (e.response.data.code === "4012" && e.response.data.category === "Security Error") {
                console.error("actions > DELETE_MESSAGE > token expired");
                return 4401;
            }
            if (e.response.data.code === "4012" || e.response.data.code === "4008") {
                console.error("actions > DELETE_MESSAGE > user or message not found");
                return 404;
            }
            if (e.response.data.code === "4001") {
                console.error("actions > DELETE_MESSAGE > 권한이 없음");
                return 401
            }
            return 500;
        }
    }

/*
// getMessageByBoardId
async [TYPE.GET_MESSAGES](params){
        try {
            console.log(`boardId : ${params.boardId}`);
            const result = await api.getBoardsMessages(params.boardId);
            context.commit(TYPE.SET_MESSAGES, result.data);
            return 200;
        } catch(e) {
            console.error("GET_MESSAGES_BY_ID error : ",e);
        }
    }
*/

}

// mutations
const mutations = {
    [TYPE.CREATE_MESSAGE](state, payload) {
        if(Array.isArray(state.messages)) {
            state.messages.push(payload);
        } else {
            state.messages = [payload];
        }
    },
    [TYPE.SET_MESSAGES](state, payload) {
        state.messages = payload;
    },
    [TYPE.UPDATE_BOARD](state, payload) {
        if(Array.isArray(state.messages)) {
            const idx = _.findIndex(state.messages, (message) => message.id === payload.id)
            state.messages[idx] = payload;
        } else {
            state.messages = [payload];
        }
    },
    [TYPE.DELETE_MESSAGE](state, messageId){
        if (Array.isArray(state.boards)) {
            const idx = _.findIndex(state.messages, (message) => message.id === messageId)
            state.messages.splice(idx,1);
        } else {
            state.messages = [];
        }
        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}