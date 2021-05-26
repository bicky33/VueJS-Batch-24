export default({
    namespaced: true, 
    state:{
        status: false,
        color: 'success', 
        text: '',
    },
    mutations:{
        set: (state, data) =>{
            state.status = data.status
            state.color  = data.color
            state.text   = data.text
        }
    },
    actions:{
        set({commit}, data){
            commit('set', data)
        }
    },
    getters: {
        status: state => state.status,
        color: state => state.color,
        text: state => state.text,

    }
})