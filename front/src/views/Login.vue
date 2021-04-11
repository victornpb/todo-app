<template>
  <v-container fluid fill-height class="">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          
          <AppBanner/>

          <v-container>
            <v-card-title primary-title class="justify-center">
              <h2 class="headline">Log in to continue</h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login()" v-model="valid" ref="form">

                <v-text-field
                  type="email"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  placeholder="E-mail"
                  name="username"
                  prepend-icon="email"
                  autocomplete="email"
                  autofocus
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
                />
                
                <v-btn :disabled="!valid" color="primary" type="submit" :loading="isLoading" block large>Log In</v-btn>
                <v-alert v-if="error" :value="true" type="error" dismissible>
                  {{error}}
                </v-alert>
                <br>
                <div class="text-center">
                    or
                    <router-link to="/register">Register</router-link>
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
import store from '@/store';
import AppBanner from '../components/AppBanner.vue';

export default {
    components:{
        AppBanner,
    },
    mounted(){
      // if the user is logged forword to the main page
      if(this.$store.getters.isLogged)
        this.$router.push('/');
    },
    data(){
        return {
            isLoading:false,

            uncloak: false,

            email:'',
            password: '',

            valid: false,
            rules:{
                required: val=>!val?'Cannot be empty':true,
                email: val=>!/.@./.test(val)?'Invalid email':true,
            },
            error: null,
        };
    },
    methods:{
        async login(){
            this.error = false;
            this.isLoading = true;
            try{

                const { data, status } = await this.$axios.post('/user/login', {
                    email: this.email,
                    password: this.password,
                });
                
                if(status===404){
                    this.incorretCredentials = 'User does not exist';
                }
                else if(status===401){
                    this.incorretCredentials = 'Incorrect Password';
                }
                else if(status===200){
                    this.setLoggedUser(data);
                    this.$router.push('/board');
                }
                else {
                    console.error('Unexpected error', status, data);
                }
            }catch(err){
                console.log('Unexpected error', {err});
                this.error = err && err.response && err.response.data.message;
            }
            finally{
                this.isLoading = false;
            }
        },
        register(){

        },
        setLoggedUser(user){
            this.$store.commit('setLoggedUser', user);
        }
    }
}
</script>