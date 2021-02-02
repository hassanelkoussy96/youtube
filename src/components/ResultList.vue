<template>
  <div v-if="resultsDetails && results">
    <div v-bind:key="index" v-for="(item, index) of results.data.items">
      <VideoThumbnail
        v-if="item.id.kind === 'youtube#video'"
        v-bind:video="item"
        v-bind:videoDetails="resultsDetails.get(item.id.videoId)"
      />
      <PlaylistThumbnail
        v-if="item.id.kind === 'youtube#playlist'"
        v-bind:playlist="item"
        v-bind:playlistDetails="resultsDetails.get(item.id.playlistId)"
      />
      <ChannelThumbnail
        v-if="item.id.kind === 'youtube#channel'"
        v-bind:channel="item"
        v-bind:channelDetails="resultsDetails.get(item.id.channelId)"
      />
    </div>
  </div>
</template>

<script>
import VideoThumbnail from "./VideoThumbnail";
import PlaylistThumbnail from "./PlaylistThumbnail";
import ChannelThumbnail from "./ChannelThumbnail";
export default {
  name: "ResultList",
  props: {
    results: Object,
    resultsDetails: Map
  },
  components: {
    VideoThumbnail,
    PlaylistThumbnail,
    ChannelThumbnail
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
