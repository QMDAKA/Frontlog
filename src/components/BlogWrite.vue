<template>
  <html>
  <head>
    <title>Future Imperfect by HTML5 UP</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
  </head>
  <body>
  <div id="wrapper">
    <blog-nav></blog-nav>
    <form>
      <div class="form-group">
        <label class="control-label">Title:</label>
        <input class="form-control" id="title" required v-model="post.title">
      </div>
      <div v-for="(tag,index) in post.tags">
        <div class="form-group form-inline">
          <label class="control-label">Tag:</label>
          <input class="form-control" style="width: 200px" id="tag" v-bind:value="tag" required>
          <i class="fa fa-plus-circle fa-2x" aria-hidden="true" v-on:click="addNewInput"></i>
          <i class="fa fa-window-close fa-2x" aria-hidden="true" v-on:click="deleteInput(index)"></i>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">Image:</label>
        <input class="form-control" id="image" v-on:change="onFileSelected" type="file" ref="fileInput" required>
      </div>
      <div class="form-group">
        <label>Body:</label>
        <froala :tag="'textarea'" :config="config" v-model="post.body" id="body"></froala>
      </div>
      <button class="btn btn-success btn-lg pull-right " v-on:click="onUpload()">Finish</button>
    </form>

  </div>
  </body>
  </html>
</template>

<script>
  import Form from "bootstrap-vue/es/components/form/form";
  import VueFroala from 'vue-froala-wysiwyg';
  import BlogNav from './BlogNav'

  const FormData = require('form-data');
  const axios = require('axios');
  const constant = require('../../config/constant')
  let serverHost = constant.serverHost
  let tags = ['Tags'];
  export default {
    components: {Form, BlogNav},
    name: "blog-write",
    data() {
      return {
        tags: tags,
        post: {
          title: 'hello',
          image: null,
          body: 'Edit Your Content Here',
          tags: tags
        },
        postBlogUrl: serverHost + '/posts',
        config: {
          height: '300',
          imageUploadParam: 'file',
          imageUploadURL: serverHost + '/images',
          imageUploadMethod: 'POST',
          imageUploadRemoteUrls: true,
          imageMaxSize: 10 * 1024 * 1024,
          imageMove: true,
          imagePaste: true,
          fontFamilySelection: true,
          events: {
            'froalaEditor.initialized': function () {
            },
            'froalaEditor.image.uploaded': function (e, editor, response) {
            },
            'froalaEditor.image.error': function (e, editor, error, response) {
              console.log(error)
            },
            'froalaEditor.image.inserted': function (e, editor, $img, response) {
              console.log(response)
            }

          }
        },
      }
    },
    methods: {
      onFileSelected(event) {
        this.post.image = event.target.files[0]
      },
      async onUpload() {
        try {
          const fd = new FormData();
          if (this.post.image !== null) {
            fd.append('image', this.post.image, this.post.image.name)
            console.log(this.$localStorage.get('token'))
            let result = await axios(
              {
                method: 'POST',
                url: this.postBlogUrl,
                headers: {
                  'Authorization': 'Bearer ' + this.$localStorage.get('token'),
                  'Content-Type': 'multipart/form-data'
                },
                data: fd,
                params: {
                  title: this.post.title,
                  body: this.post.body,
                  tags: this.post.tags,
                }
              });
            console.log(result)
            if (result.data.success) {
              window.location.replace('/blog/' + result.data.payload[0].id)
            }
          }
          else
            alert('Image not found')

        } catch (err) {
          console.log(err)
        }
      },
      addNewInput: function () {
        this.tags.push('Tags' + Date.now())
        console.log(this.tags)
      },
      deleteInput: function (index) {
        if (this.tags.length > 1) {
          this.tags.splice(index, 1)
          console.log(index)
        }
      }
    },
    beforeMount() {
      this.$nextTick(() => {
        console.log('initialized')
      });
    }
  }
</script>

<style scoped>
  @import "../assets/css/form.css";
  @import "../assets/css/main.css";
</style>
