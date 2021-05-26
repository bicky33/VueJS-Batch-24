import Vue from 'vue'
import Vuex from 'vuex'
import alert from './alert'
import dialog from './dialog'
import auth from './auth'
import VuexPersistence from 'vuex-persist'

const VuexPersist = new VuexPersistence({
    key: 'sanbercode',
    storage: localStorage
})

Vue.use(Vuex)
 export default new Vuex.Store({
    plugins: [VuexPersist.plugin],
     modules: {
         alert,
         dialog,
         auth,
     }
 })