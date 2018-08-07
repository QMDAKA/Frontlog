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
        <input class="form-control" id="title" required>
      </div>
      <div v-for="(tag,index) in tags">
        <div class="form-group form-inline" >
          <label class="control-label">Tag:</label>
          <input class="form-control" style="width: 200px" id="Tag" v-bind:value="tag" required>
          <i  class="fa fa-plus-circle fa-2x" aria-hidden="true"  v-on:click="addNewInput"></i>
          <i  class="fa fa-window-close fa-2x" aria-hidden="true" v-on:click="deleteInput(index)"></i>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">Image:</label>
        <input class="form-control" id="image" placeholder="Image" type="file" required>
      </div>
      <div class="form-group">
        <label>Body:</label>
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
      </div>
      <button class="btn btn-success btn-lg pull-right " type="submit">Finish!</button>
    </form>
  </div>
  </body>
  </html>
</template>

<script>
  import Form from "bootstrap-vue/es/components/form/form";
  import VueFroala from 'vue-froala-wysiwyg';
  import BlogNav from './BlogNav'

  let tags = ['Tags'];
  export default {
    components: {Form, BlogNav},
    methods: {
      addNewInput: function () {
        this.tags.push('Tags'+Date.now())
        console.log(this.tags)
      },
      deleteInput: function (index) {
        if(this.tags.length>1) {
          this.tags.splice(index, 1)
          console.log(index)
        }
      }

    },
    name: "blog-write",
    data() {
      return {
        tags: tags,
        config: {
          height: '300',
          imageMove: true,
          imagePaste: true,
          fontFamilySelection: true,
          events: {
            'froalaEditor.initialized': function () {
              console.log('initialized')

            }
          }
        },
        model: 'Edit Your Content Here!'
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
