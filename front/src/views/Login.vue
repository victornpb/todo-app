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
              <v-form @submit.prevent="login()" ref="form">

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
                  :error="incorretCredentials"
                  @click:append="uncloak = !uncloak"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  prepend-icon="lock"
                  autocomplete="current-password"
                />
                
                <v-btn :disabled="errors.lenth === 0" color="primary" type="submit" :loading="isLoading" block large>Log In</v-btn>
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
    data(){
        return {
            isLoading:false,

            uncloak: false,

            email:'',
            password: '',

            rules:{
                required: val=>!val?'Cannot be empty':false,
                email: val=>!/.@./.test(val)?'Invalid email':false,
            },
            incorretCredentials: null,
            errors: 0,
            resetPasswordDialog: false,
        };
    },
    methods:{
        async login(){
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
                console.log('Unexpected error', err, err.status);
            
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