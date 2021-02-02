<template>
  <div class="video-player-container">
    <div class="video-container">
      <video-embed class="video" v-bind:src="videoUrl"></video-embed>
    </div>
    <ResultList
      v-if="results && detailsMap"
      v-bind:results="results"
      v-bind:resultsDetails="detailsMap"
    ></ResultList>
  </div>
</template>

<script>
import ResultList from "../components/ResultList";
import SearchService from "../services/searchService";
import SearchDetailsService from "../services/SearchDetailsService";

export default {
  name: "VideoPlayer",
  data: () => {
    return {
      videoId: null,
      videoUrl: "https://www.youtube.com/watch?v=",
      results: null,
      detailsMap: null,
      videosIds: "id=",
      playlistsIds: "id="
    };
  },
  created() {
    const queryParams = this.$router.currentRoute.params;
    SearchService.getRelevantVideos(queryParams).then(res => {
      this.separateItems(res.data.items);
      SearchDetailsService.getVideosDetails(this.videosIds)
        .then(videoDetails => {
          SearchDetailsService.getPlaylistsDetails(this.playlistsIds)
            .then(playlistDetails => {
              this.detailsMap = new Map();
              videoDetails.data.items?.forEach(video => {
                this.detailsMap.set(video.id, video);
              });
              playlistDetails.data.items?.forEach(playlist => {
                this.detailsMap.set(playlist.id, playlist);
              });
              this.results = res;
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    });
    return {
      videoId: queryParams.id,
      videoUrl: (this.videoUrl += queryParams.id)
    };
  },
  methods: {
    separateItems(items) {
      items?.forEach(item => {
        if (item.id.kind === "youtube#video") {
          this.videosIds += "," + item.id.videoId;
        } else if (item.id.kind === "youtube#playlist") {
          this.playlistsIds += "," + item.id.playlistId;
        } else {
          this.channelsIds += "," + item.id.channelId;
        }
      });
    }
  },
  components: {
    ResultList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mobile: 640px;

.video-player-container {
  margin-left: auto;
  margin-right: auto;
}
.video-container {
  width: 100%;
  margin-bottom: 30px;
}
.video {
  width: 100%;
  text-align: center;
}
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
