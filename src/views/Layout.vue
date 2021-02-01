<template>
  <div>
    <nav-bar />
  </div>
</template>

<script>
import NavBar from "../components/SearchBar";

export default {
  name: "Layout",
  components: {
    NavBar
  }
  // props: {
  //     msg: String
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
