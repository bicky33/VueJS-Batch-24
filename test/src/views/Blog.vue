<template>
  <v-container class="ma-0 pa-0" grid-list-sm> 
    <v-subheader>
      All Blogs
    </v-subheader>
    <v-layout wrap>
      <BlogsComponent v-for="(blog, index) in blogs" :key="`blog-${index}`" :blog="blog">
      </BlogsComponent>
    </v-layout>
    <v-pagination v-model="page" @input="go" :length="lengPage" :total-visible="8">
    </v-pagination>
  </v-container>
</template>

<script>
import BlogsComponent from '../components/BlogsComponent'

export default {
  name: 'Blogs',
  data:()=>({
    apiDomain : 'https://demo-api-vue.sanbercloud.com/',
    blogs: [], 
    page: 0, 
    lengPage: 0, 
    perPage: 0,
  }), 
  components: {
    BlogsComponent
  },
  methods:{
    go(){
      const config = {
        method: 'GET', 
        url: this.apiDomain + 'api/v2/blog',
        params: {
          'page': this.page
        }
      }
      this.axios(config).then(
        response => {
          let { blogs } = response.data
          this.blogs = blogs.data
          this.page = blogs.current_page
          this.lengPage = blogs.last_page
          this.perPage = blogs.per_page
        })
          .catch(error=> console.log(error))
    }
  }, 
  created(){
    this.go()
  }
}
</script>