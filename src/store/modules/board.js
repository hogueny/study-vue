import _ from "underscore";
import * as api from "../../config/api";
import * as TYPE from "../../config/mutation-types";

const state = {
    board: {
        id: -1,
        name: "",
        regDate: "",
        modDate: "",
    },
    boards: []
}

// getters
const getters = {
    board: state => state.board,
    boards: state => state.boards
}


// actions
const actions = {
    async [TYPE.DELETE_BOARD](context, boardId) {
        try {
            console.log(`boardId : ${boardId}`)
            const token = localStorage.getItem("token");
            if (!token || token === "") {
                return 401;
            }
            const result = await api.removeBoard({boardId: boardId, token: token});
            context.commit(TYPE.DELETE_BOARD, boardId);
            return 204;
        } catch (e) {
            console.error("DELETE_BOARD error : ", e);
            console.error("actions > DELETE_BOARD > error : ", e.response.data);
            if (e.response.data.code === "4012" && e.response.data.category === "Security Error") {
                console.error("actions > DELETE_BOARD > token expired");
                return 4401;
            }
            if (e.response.data.code === "4012" || e.response.data.code === "4008") {
                console.error("actions > DELETE_BOARD > user or board not found");
                return 404;
            }
            if (e.response.data.code === "4001") {
                console.error("actions > DELETE_BOARD > 권한이 없음");
                return 401
            }
            return 500;
        }
    },
    async [TYPE.GET_BOARDS](context) {
        try {
            const result = await api.getBoards();
            context.commit(TYPE.SET_BOARDS, result.data);
            return 200;
        } catch (e) {
            console.error("GET_BOARDS error : ", e);
            return 500;
        }
    },
    async [TYPE.CREATE_BOARD](context, name) {
        try {
            const token = localStorage.getItem("token");
            if (!token || token === "") {
                return 401;
            }
            const result = await api.createBoard({ name: name, token: token });
            context.commit(TYPE.CREATE_BOARD, result.data);
            return 201;
        } catch (e) {
            console.error("actions > CREATE_BOARD > error : ", e.response.data);
            if (e.response.data.code === "4012" || e.response.data.code === "4008") {
                console.error("actions > CREATE_BOARD > user not found");
                return 404;
            }
            if (e.response.data.code === "3001") {
                console.error("actions > CREATE_BOARD > name min 3 max 3");
                return 400;
            }

            if (e.response.data.code === "4001") {
                console.error("actions > CREATE_BOARD > user role not permitted");
                return 4001;
            }
            return 500;
        }
    },
    async [TYPE.UPDATE_BOARD](context, params) {
        try {
            const token = localStorage.getItem("token");
            if (!token || token === "") {
                return 401;
            }
            const result = await api.updateBoard({ boardId: params.boardId, name: params.name, token: token });
            context.commit(TYPE.UPDATE_BOARD, result.data);
            return 200;
        } catch (e) {
            console.error("actions > UPDATE_BOARD > error : ", e.response.data);
            if (e.response.data.code === "4012" || e.response.data.code === "4008") {
                console.error("actions > UPDATE_BOARD > user or board not found");
                return 404;
            }
            if (e.response.data.code === "3001") {
                console.error("actions > CREATE_BOARD > name min 3");
                return 400;
            }

            if (e.response.data.code === "4001") {
                console.error("actions > CREATE_BOARD > user role not permitted");
                return 4001;
            }
            return 500;
        }
    }
}

// mutations
const mutations = {
    [TYPE.CREATE_BOARD](state, payload) {
        if (Array.isArray(state.boards)) {
            state.boards.push(payload);
        } else {
            state.boards = [payload];
        }
    },
    [TYPE.SET_BOARDS](state, payload) {
        state.boards = payload;
    },
    [TYPE.UPDATE_BOARD](state, payload) {
        if (Array.isArray(state.boards)) {
            const idx = _.findIndex(state.boards, (board) => board.id === payload.id)
            state.boards[idx] = payload;
        } else {
            state.boards = [payload];
        }
    },
    [TYPE.DELETE_BOARD](state, boardId) {
        if (Array.isArray(state.boards)) {
            const idx = _.findIndex(state.boards, (board) => board.id === boardId)
            state.boards.splice(idx, 1);
        } else {
            state.boards = [];
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}