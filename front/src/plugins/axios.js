import Vue from 'vue';
import VueAxios from 'vue-plugin-axios';
import axios from 'axios';
import store from '@/store';

Vue.use(VueAxios, {
  axios,
  // example config for axios instance
  config: {
    // axios instance config
    baseURL: process.env.VUE_APP_API_URL, // api URL
    headers: {}, // default headers
  },
  interceptors: {
    // this function shows how to add Authorization header to requests
    beforeRequest(config, axiosInstance) {
      // your auth token
      const token = store.getters.getToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    // this function shows how to add errors from server to client app
    beforeResponseError(error) {
      const { response, message } = error;

      if (response) {
        // backend error
        // shows response error
        // alert(error.response.data.message);
      } else if (message) {
        // network error
        // alert(message);
      }

      // return Promise.reject(error)
    },
  },
});
