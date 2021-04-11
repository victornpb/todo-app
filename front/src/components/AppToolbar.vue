<template>
  <v-toolbar
    :class="classes"
    :color="colorName"
    :absolute="position !== 'fixed' ? true : undefined"
    :fixed="position === 'fixed' ? true : undefined"
    :dense="dense ? true : undefined"
    app
    dark
  >
    <slot name="icon-toolbar" />

    <v-toolbar-title style="width: 300px" class="--hidden-sm-and-down"> <v-icon>check</v-icon> To-do App </v-toolbar-title>

    <template slot="extension">
      <slot />
    </template>

    <v-spacer></v-spacer>

    <!-- Avatar menu -->
    <v-menu offset-y app>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon large>
          <v-avatar size="32px">
            <img :src="gravatarUrl" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item avatar>
          <v-list-item-avatar>
            <img :src="gravatarUrl" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-sub-title>{{ email }}</v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-checkbox v-model="darkmode" color="primary"></v-checkbox>

          <v-list-item-title class="pl-3"> Dark mode </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="logout">
          <v-icon class="icon-width">input</v-icon>
          <v-list-item-title> Log out </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import md5 from 'md5';
export default {
  props: {
    position: {
      type: String,
      default: 'fixed',
      validator(value) {
        return ['fixed', 'absolute'].includes(value);
      },
    },
    classes: {
      type: String,
      default: 'primary',
    },
    dense: {
      type: Boolean,
      default: true,
    },
    colorName: String,
  },
  components: {},
  computed: {
    name() {
      return this.$store.getters.userName;
    },
    email() {
      return this.$store.getters.userEmail;
    },
    gravatarUrl() {
      const hash = md5(String(this.$store.getters.userEmail).toLowerCase()).toLowerCase();
      return `https://www.gravatar.com/avatar/${hash}?s=200&d=mp&r=g`;
    },
  },

  methods: {
    logout() {
      this.$store.commit('setLoggedUser', null);
      this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.icon-width {
  width: 56px;
}
</style>