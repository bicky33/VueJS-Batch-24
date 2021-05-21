export  const store = new Vuex.Store({
    state: {
        name: '',
        address: '',
        phone: '',
        members: '',
        errors: [],
        buttonStatus: false,
        idMember: null,
        uploadStatus: false,
        pathUpload: null,
    },
    mutations: {
        updatedName(state, value) {
            state.name = value
        },
        updatedAddress(state, value) {
            state.address = value
        },
        updatedPhone(state, value) {
            state.phone = value
        }, 
        updatedMembers(state, value){
            state.members = value
        }, 
        updatedUpload(state, data){
            state.name = data.name
            state.address = data.address
            state.phone = data.no_hp
            state.idMember = data.id
            state.uploadStatus = true
        },
        updatedButtonStatus(state, data){
            state.name = data.name
            state.address = data.address
            state.phone = data.no_hp
            state.buttonStatus = true
            state.idMember = data.id
        },
        updatedEditMember(state, data) {
            state.name = data.name
            state.address = data.address
            state.phone = data.no_hp
            state.buttonStatus = true
            state.idMember = data.id
        }, 
        clearForm(state, data){
            state.name = ''
            state.address = ''
            state.phone = ''
            state.idMember = null
        }, 
        handleFileUpload(state, file) {
            state.pathUpload = file
        }
    }, 
    actions: {
        getMembers(context){
            const config = {
                method: 'GET',
                url: 'http://demo-api-vue.sanbercloud.com/api/member',
            }

            axios(config)
                .then(response => context.commit('updatedMembers', response.data.members))
                    .catch(error => console.log(error))
        }, 
        deleteMember(context, id){
            const config = {
                method: 'POST',
                url: `http://demo-api-vue.sanbercloud.com/api/member/${id}`,
                params: {
                    _method: "DELETE"
                }
            }

            axios(config)
                .then(response => context.dispatch('getMembers'))
                    .catch(error => console.log(error))
        }, 
        postMember(context, data) {
            const config = {
                method: 'POST',
                url: 'http://demo-api-vue.sanbercloud.com/api/member',
                data
            }

            axios(config)
                .then(response => {
                    context.commit('clearForm')
                    context.dispatch('getMembers')
                })
                    .catch(error => console.log(error))
        },
        uploadPhotoMember(context, data){

        }, 
        updateMember({dispatch, state}) {
            console.log(state);
            const config = {
                method: 'POST',
                url: `http://demo-api-vue.sanbercloud.com/api/member/${state.idMember}`,
                params: {
                    _method: "PUT"
                },
                data:{
                    name: state.name,
                    address: state.address, 
                    no_hp: state.phone,
                }
            }

            axios(config)
                .then(response => dispatch('getMembers'))
                    .catch(error => console.log(error))
        },
        uploadPhotoMember({state, dispatch, commit}){
            let form = new FormData()
            form.append('photo_profile', state.pathUpload)

            const config = {
                method: 'POST',
                url: `http://demo-api-vue.sanbercloud.com/api/member/${state.idMember}/upload-photo-profile`,
                data:form
            }

            axios(config)
                .then(response => dispatch('getMembers'))
                    .catch(error => console.log(error))
            commit('clearForm')
        }
    }
})