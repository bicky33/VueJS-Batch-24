<template>
  <v-container class="ma-0 pa-0" grid-list-sm> 
    <div class="text-right">
      <v-btn small text to="/blogs" class="blue--text">
        All Blogs
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-layout wrap>
        <v-flex v-for="(blog, index) in blogs" :key="`blog-${index}`" xs6>
          <v-card :to="`/blog/${blog.id}`">
              <v-img :src="blog.photo? apiDomain + blog.photo : 'https://picsum.photos/200/300'" 
                class="white--text" height="200">
                <v-card-title class="fill-height align-end"
                  v-text="blog.title">
                </v-card-title>
              </v-img>
                <v-card-actions>
                  <v-progress-linear color="grey" heigh="7"> 
                  </v-progress-linear>
                </v-card-actions>
                <v-card-actions>
                  <span>{{ blog.title.substring(0,15) }} .....</span>
                </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data:() => ({
      blogs: [], 
      apiDomain : 'https://demo-api-vue.sanbercloud.com/',
    }),
    created() {
      const config = {
        method: 'GET', 
        url: this.apiDomain + '/api/v2/blog/random/4' 
      }     
      this.axios(config).then(response => this.blogs = response.data.blogs)
    }
  }
</script>
