import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: null,
  },
  mutations: {
    setLoggedUser(state, loggedUser) {
      state.loggedUser = loggedUser;
      if (loggedUser) localStorage.setItem('LoggedUser', JSON.stringify(loggedUser));
      else localStorage.removeItem('LoggedUser');
    }
  },
  getters: {
    getLoggedUser(state) {
      if (!state.loggedUser) {
        // yeah, this is not the most elegant sollution
        try {
          state.loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
        } catch (err) { }
      }
      return state.getters.loggedUser;
    },
    isLogged(state) {
      return Boolean(state.loggedUser);
    },
    getToken(state) {
      return state.loggedUser && state.loggedUser.token;
    }
  },
  actions: {},
  modules: {},
});
