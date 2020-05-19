import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    sidebarShow: "responsive",
    sidebarMinimize: false,
    loggedIn: localStorage.token ? true : false,
    token: localStorage.token,
    api_url: "http://school.test/api"
};

const mutations = {
    toggleSidebarDesktop(state) {
        const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
        state.sidebarShow = sidebarOpened ? false : "responsive";
    },
    toggleSidebarMobile(state) {
        const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
        state.sidebarShow = sidebarClosed ? true : "responsive";
    },
    set(state, [variable, value]) {
        state[variable] = value;
    },
    SET_loggedIn(state, payload) {
        state.loggedIn = payload;
    }
};
const getters = {
    get_loggedIn(state) {
        return state.loggedIn;
    },
    getApiUrl(state) {
        return state.api_url;
    },
    getToken(state) {
        return state.token;
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters
});