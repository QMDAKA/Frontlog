<template>
  <body class="single">
  <!-- Wrapper -->
  <div id="wrapper">

    <!-- Main -->
    <div id="main">
      <blog-nav></blog-nav>
      <!-- Post -->
      <article class="post">
        <header>
          <div class="title">
            <h2><a href="#">{{title}}</a></h2>
            <p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
          </div>
          <div class="meta">
            <time class="published" datetime="2015-11-01">November 1, 2015</time>
            <a href="#" class="author"><span class="name">Jane Doe</span><img src="../images/avatar.jpg" alt="" /></a>
          </div>
        </header>
        <span class="image featured"><img :src='image' alt="" /></span>
        <froalaView v-model="body"></froalaView>
        <footer>
          <ul class="stats">
            <li><a href="#">General</a></li>
            <li><a href="#" class="icon fa-heart">28</a></li>
            <li><a href="#" class="icon fa-comment">128</a></li>
          </ul>
        </footer>
      </article>

    </div>

    <!-- Footer -->
    <section id="footer">
      <ul class="icons">
        <li><a href="#" class="fa-twitter"><span class="label">Twitter</span></a></li>
        <li><a href="#" class="fa-facebook"><span class="label">Facebook</span></a></li>
        <li><a href="#" class="fa-instagram"><span class="label">Instagram</span></a></li>
        <li><a href="#" class="fa-rss"><span class="label">RSS</span></a></li>
        <li><a href="#" class="fa-envelope"><span class="label">Email</span></a></li>
      </ul>
      <p class="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a href="http://unsplash.com">Unsplash</a>.</p>
    </section>

  </div>

  </body>
</template>

<script>
import axios from 'axios'
import BlogNav from './BlogNav'
import VueFroala from 'vue-froala-wysiwyg';
const constant = require('../../config/constant')
let serverHost = constant.serverHost
export default {
  components: {BlogNav},
  name: 'blog',
  data () {
    return {
      title: null,
      image: null,
      body: null
    }
  },
  async mounted () {
    try {
      console.log(this.$route.params.id);
      let result = await axios(
        {
          method: 'GET',
          url: serverHost+"/posts/"+this.$route.params.id,
          headers: {
            'Authorization': 'Bearer ' + this.$localStorage.get('token'),
          }
        });
      console.log(result);
      if(result.data.success){
        this.image = result.data.payload.image
        this.title = result.data.payload.title
        this.body = result.data.payload.body
      }
    } catch (e) {
      this.errors.push(e)
    }
  }
}

</script>

<style scoped>
  @import "../assets/css/main.css";

</style>
