<template>
    <v-card>
        <v-toolbar dark color="success">
            <v-btn @click.native="close" icon dark >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
                Login
            </v-toolbar-title>
        </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
        <v-form ref="form">
            <v-text-field
                v-model="email"
                label="E-mail"
                required
                append-icon="mdi-email"
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                :append-icon="showPassword? 'mdi-eye': 'mdi-eye-off'"
                :type="showPassword? 'text': 'password'"
                counter
                @click:append="showPassword = !showPassword"
            >
            </v-text-field>
            <div class="text-xs-center">
                <v-btn 
                    color="success lighten-1"
                    @click="submit"
                > 
                    Login
                    <v-icon right dark> mdi-lock-open</v-icon>
                </v-btn>
            </div>
        </v-form>
    </v-container>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({
        email: '',
        password: '', 
        showPassword: false,
        apiDomain: 'https://demo-api-vue.sanbercloud.com/'
    }),
    methods:{
        ...mapActions({
            setAlert: 'alert/set',
            setToken: 'auth/setToken'
        }),
        close(){
            this.$emit('closed', false)
        },
        submit(){
            const config = {
                url: this.apiDomain + 'api/v2/auth/login',
                method: 'POST',
                data: {
                    'email': this.email,
                    'password': this.password
                }
            }

            this.axios(config)
                .then((response)=>{
                    this.setToken(response.data.access_token)
                    this.setAlert({
                        status: true,
                        color: 'success', 
                        text: 'Selamat anda berhasil login'
                    })
                    this.close()
                }).catch(()=>{
                    this.setAlert({
                        status: true,
                        color: 'error', 
                        text: 'Selamat anda gagal login'
                    })
                    this.close()
                })
        }
    }
}
</script>