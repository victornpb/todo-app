<template>
  <v-app style="background: #f3f3f6;">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
// import Login from './views/Login.vue';

export default {
  name: 'App',

  components: {
    // Login,
    // HelloWorld,
  },

  computed: {
    // ...mapGetters(['isAuthenticated', 'color', 'darkmode']),
    // isAuthenticated
    isValidUnauthenticatedRoutes() {
      // const route = this.$route.path.split('/')[1];
      // const validRoutes = ['login', 'resetPassword'];
      // if (validRoutes.includes(route)) {
      //     return true;
      // } else {
      //     return false;
      // }
      return false;
    },
  },

  data: () => ({
    isAuthenticated:false,
  }),
};
</script>
