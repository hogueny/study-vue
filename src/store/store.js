import Vue from 'vue'
import Vuex from 'vuex'
import account from "./modules/account"
import board from "./modules/board"
import message from "./modules/message"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    board,
    message
  }
})