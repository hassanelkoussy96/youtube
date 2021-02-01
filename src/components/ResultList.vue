<template>
  <div v-if="results">
    <div v-bind:key="video.id.videoId" v-for="video of results.data.items">
      <VideoItem v-bind:video="video" />
    </div>
  </div>
</template>

<script>
import VideoItem from "../components/VideoItem";

export default {
  name: "ResultList",
  props: {
    results: Object
  },
  components: {
    VideoItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mobile: 640px;

.filter-icon-and-text {
  color: #9b9b9b;
  float: right;
  margin: 10px 10px 0 0;
  cursor: pointer;
}
.top-bar {
  width: 48%;
  margin-right: auto;
  margin-left: auto;
  display: table;
}
.results {
  display: inline-block;
  margin-top: 10px;
  font-weight: inherit;
}
.filter-icon-and-text-bold {
  color: #000000;
  font-weight: 600;
}
@media (max-width: $mobile) {
}
</style>
