<template>
  <div id="app">
    <a href="https://murmurache.com" target="_blank" rel="noopener">
      <img alt="Mini posts logo" src="./assets/logo.png" />
    </a>
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from "./components/PostComponent.vue";

export default {
  name: "App",
  components: {
    PostComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
