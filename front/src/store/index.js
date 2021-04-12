import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// This is just a quick solution, not meant to be used in production
const persistence = {
  read(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      void 0;
    }
    return undefined;
  },
  write(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  delete(key) {
    localStorage.removeItem(key);
  },
};

export default new Vuex.Store({
  state: {
    darkMode: false,
    loggedUser: persistence.read('LoggedUser'),
  },
  mutations: {
    setLoggedUser(state, loggedUser) {
      state.loggedUser = loggedUser;
      if (loggedUser) persistence.write('LoggedUser', state.loggedUser);
      else persistence.delete('LoggedUser');
    },
    setDarkMode(state, bool) {
      state.darkMode = bool;
    },
  },
  getters: {
    isDarkMode(state) {
      return state.darkMode;
    },
    getLoggedUser(state) {
      return state && state.loggedUser;
    },
    isLogged(state) {
      return Boolean(state && state.loggedUser);
    },
    getToken(state) {
      return state.loggedUser && state.loggedUser.token;
    },

    userName(state) {
      return state.loggedUser && state.loggedUser.user.name;
    },
    userEmail(state) {
      return state.loggedUser && state.loggedUser.user.email;
    },
  },
  actions: {},
  modules: {},
});
