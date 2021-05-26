import axios from 'axios'

export default({
    namespaced: true, 
    state:{
        user: {},
        token: ''
    },
    mutations:{
        setToken(state, data){
            state.token = data
        }, 
        setUser(state, data){
            state.user = data
        }
    },
    actions:{
        setToken({commit, dispatch}, data){
            commit('setToken', data)
            dispatch('checkToken', data)
        },
        checkToken({commit}, data){
            const config = {
                method: 'POST', 
                url: 'https://demo-api-vue.sanbercloud.com/api/v2/auth/me',
                headers:{
                    'Authorization': 'Bearer ' + data
                }
            }
            axios(config)
                .then(response=>{
                    commit('setUser', response.data)
                })
                .catch(()=>{
                    commit('setUser', {})
                    commit('setToken', '')
                })
        }
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        guest: state => Object.keys(state.user).length === 0,

    }
})