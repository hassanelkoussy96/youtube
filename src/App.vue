<template>
  <div class="app-container">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  font-family: sans-serif;
}
.app-container {
  background-color: #fafafa;
}
</style>
<script>
import NavBar from "./components/SearchBar";

export default {
  components: {
    NavBar
  }
};
</script>
