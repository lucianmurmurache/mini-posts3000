<template>
  <div class="container">
    <div class="create-post">
      <label for="create-post">Add a mini post</label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        v-on:keyup.enter="createPost"
        placeholder="Write something..."
      />
      <button v-on:click="createPost">Post</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{error}}</p>
    <h1>Latest Posts</h1>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <span aria-hidden="true" v-on:click="deletePost(post._id)">x</span>
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()} `}}
        <p class="text">{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      if (!this.text) {
        // do not submit if field is empty
        this.hasError = true;
        return;
      }
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
* Color palette:
 * #80f07d Light Green
 * #73e067 Malachite
 * #317b22 Ao English
 * #2a4d14 Lincoln Green
*/
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap);

* {
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
}

h1 {
  color: #000;
}
div.container {
  max-width: 50rem;
  margin: 0 auto;
}

p.error {
  color: #e1efe6;
  border: 0.063rem solid #1761a0;
  background-color: #ff0000;
  padding: 0.7rem;
  margin-bottom: 1rem;
}

div.post {
  position: relative;
  color: #000;
  border: 0.063rem solid #1761a0;
  border-radius: 0.4rem;
  background: rgb(131, 255, 117);
  background: linear-gradient(
    90deg,
    rgba(131, 255, 117, 1) 20%,
    rgba(115, 224, 103, 1) 100%
  );
  padding: 0.6rem 0.6rem 2rem 0.6rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.4);
  margin-bottom: 1rem;
  overflow: auto;
}

div.post p.text {
  text-align: center;
}

/*===== Input =====*/
div.create-post {
  display: inline;
}

div.create-post label {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: #000;
  display: block;
  transition: all 0.3s;
}

div.create-post input {
  color: #000;
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border: 0.063rem solid #1761a0;
  border-radius: 0.4rem;
  background-color: #fff;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.4);
  width: 70%;
}

div.create-post button {
  background-color: #fff;
  border: 0.063rem solid #1761a0;
  border-radius: 0.4rem;
  color: #000;
  padding: 0.63rem 1.2rem;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  margin: 0.1rem 0.6rem;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

div.create-post button:hover {
  background: rgb(131, 255, 117);
  background: linear-gradient(
    90deg,
    rgba(131, 255, 117, 1) 20%,
    rgba(115, 224, 103, 1) 100%
  );
}

/*===== Delete post btn =====*/
div.post span {
  text-align: right;
  border: none;
  font-size: 1.25rem;
  padding: 0;
  cursor: pointer;
  font-weight: bold;
  color: #000;
  background: transparent;
  margin-left: 95%;
  text-shadow: 0rem 0rem 0.3rem rgba(23, 97, 160, 0.5);
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.4rem 1rem 0.4rem 1rem;
  color: #000;
  background-color: #317b22;
  font-size: 0.9rem;
}

p.text {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
