<template>
  <v-container fluid fill-height class="bg">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-container>
            <v-card-title primary-title class="justify-center">
              <h2 class="headline"><v-icon>person_add</v-icon> Register</h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register()" v-model="valid" ref="form">
                <v-text-field
                  type="text"
                  v-model="name"
                  :rules="[rules.required]"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  prepend-icon="person"
                  autocomplete="name"
                  autofocus
                  outlined
                />

                <v-text-field
                  type="email"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  placeholder="E-mail"
                  name="username"
                  prepend-icon="email"
                  autocomplete="email"
                  outlined
                />

                <v-text-field
                  v-model="password"
                  :append-icon="uncloak ? 'visibility_off' : 'visibility'"
                  :rules="[rules.required]"
                  :type="uncloak ? 'text' : 'password'"
                  @click:append="uncloak = !uncloak"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  prepend-icon="lock"
                  autocomplete="current-password"
                  outlined
                />

                <v-text-field
                  v-model="repeatPassword"
                  :rules="[rules.required, veriyPw]"
                  :type="uncloak ? 'text' : 'password'"
                  label="Repeat Password"
                  placeholder="Repeat Password"
                  name="password"
                  prepend-icon="lock"
                  autocomplete="current-password"
                  outlined
                />

                <v-alert v-if="error" :value="true" type="error" dismissible>
                  {{ error }}
                </v-alert>

                <v-btn v-if="!created" :disabled="!valid" color="primary" type="submit" :loading="isLoading" block large>Create account</v-btn>

                <v-alert v-model="created" type="success">
                  <h4>Your account has been created!</h4>
                  Now please <router-link to="/login">Log in</router-link>
                </v-alert>
                <br />
                <div class="text-center">
                  or
                  <router-link to="/login">Log in</router-link>
                </div>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import store from '@/store';
// import AppBanner from '../components/AppBanner.vue';

export default {
  components: {
    // AppBanner,
  },
  data() {
    return {
      isLoading: false,

      uncloak: false,

      name: '',
      email: '',
      password: '',
      repeatPassword: '',

      valid: false,
      rules: {
        required: (val) => (!val ? 'Cannot be empty' : true),
        email: (val) => (!/.@./.test(val) ? 'Invalid email' : true),
      },

      created: null,

      error: null,
    };
  },
  methods: {
    veriyPw() {
      return this.password === this.repeatPassword ? true : 'Password does not match';
    },
    async register() {
      this.error = null;
      this.isLoading = true;
      try {
        const data = await this.$post('/user/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        this.created = data;
        // this.$router.push('/login');
      } catch (err) {
        console.log('Unexpected error', { err: err });
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },

    setLoggedUser(user) {
      this.$store.commit('setLoggedUser', user);
    },
  },
};
</script>