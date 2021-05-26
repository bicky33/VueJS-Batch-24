<template>
  <div>
    <v-card>
      <v-img :src="blog.photo? apiDomain + blog.photo: 'https://picsum.photos/200/300'" height="200px" class="white--text">
        <v-card-title class="fill-height align-end" v-text="blog.title">
        </v-card-title>
      </v-img>
      <v-card-text>
        <v-simple-table dense>
          <tbody>
            <tr>
              <td><v-icon>mdi-format-title</v-icon>Judul</td>
              <td class="blue--text">{{ blog.title }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-note</v-icon>Deksripsi</td>
              <td>{{ blog.description }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data:() => ({
      blog: {}, 
      apiDomain : 'https://demo-api-vue.sanbercloud.com/',
    }),
    methods:{
      go(){
        let { id } = this.$route.params
        const config = {
          method: 'GET', 
          url: this.apiDomain + `api/v2/blog/${id}`,
        }     
      this.axios(config)
        .then(response => this.blog = response.data.blog)
          .catch(error => {
            console.log(error)
          })
      }
    },
    created() {
      this.go()
    }
  }
</script>
