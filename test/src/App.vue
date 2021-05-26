<template>
<!-- App.vue -->

  <v-app>
    <Alert/>
    <Dialog/>
    <v-navigation-drawer app v-model="drawer">
      <!-- Side Bar -->
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img :src="user.photo_profile? apiDomain+user.photo_profile:'httpss://i.pravatar.cc/300'"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{  user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-if="guest" class="pa-2">
          <v-btn block color="primary"  class="mb-1" @click="login">
            <v-icon left> mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="success">
            <v-icon left> mdi-account</v-icon>
            Register
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-list-item v-for="(menu, index) in menus" :key="`menu-${index}`" :to="menu.route">
          <v-list-item-icon>
            <v-icon left>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="!guest">
        <div class="pa-2"> 
          <v-btn block color="red" dark @click="logout">
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <!-- Header -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- footer -->
      @SanbersCode
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Alert from './components/Alert'
import Dialog from './components/Dialog'

export default {
  name: 'App',

  data: () => ({
    drawer:  true, 
    menus: [
      {title: 'Home', icon:'mdi-home', route:'/' },
      {title: 'Blogs', icon:'mdi-note', route:'/blogs' },
    ], 
    apiDomain : 'https://demo-api-vue.sanbercloud.com',
  }),
  components: { 
    Alert,
    Dialog,
  },
  methods: {
    ...mapActions({
      setAlert : 'alert/set',
      setDialogComponent : 'dialog/setComponent', 
      setCheckToken: 'auth/checkToken',
    }),
    ...mapMutations({
      setToken: 'auth/setToken', 
      setUser: 'auth/setUser',
    }),
    login(){
      this.setDialogComponent({ component: 'login' })
    },
    logout(){
      const config = {
        method: 'POST', 
        url: this.apiDomain+'/api/v2/auth/logout',
        headers:{
            'Authorization': 'Bearer ' + this.token
        }
      }

      console.log(this.token);
      this.axios(config)
        .then(()=>{
          this.setToken('')
          this.setUser({})
          this.setAlert({
            status: true, 
            color: 'success',
            text: 'Anda berhasil Logout',
          })
        }).catch((error)=>{
          console.log(error);
          this.setAlert({
            status: true, 
            color: 'success',
            text: 'Cie gagal logout',
          })
        })
    }
  }, 
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      token: 'auth/token'
    })
  }, 
  mounted(){
    if(this.token){
        this.setCheckToken(this.token)
    }
  }

};
</script>
