<template>
  <v-app class="bg" :dark="darkMode">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {

  },

  computed: {
    darkMode: {
      get () {
        return this.$store.getters.isDarkMode;
      },
      set (value) {
        this.$store.commit('setDarkMode', value);
      }
    },
  },

  data: () => ({
    
  }),
};
</script>
