<template>
  <div class="video-player-container">
    <div v-if="channelFullDetails" class="channel-title-container">
      <img
        class="circular-img"
        :src="channelFullDetails.snippet.thumbnails.medium.url"
        alt="YouTube thumbnail"
      />
      <div class="background-img-container">
        <img
          class="card-img-background"
          :src="channelFullDetails.brandingSettings.image.bannerExternalUrl"
          alt="YouTube"
        />
      </div>
      <h3 class="title-text">{{ channelFullDetails.snippet.title }}</h3>
      <img
        class="subscribe-button"
        src="../assets/subscribe.png"
        alt="Subscribe"
      />
    </div>
    <ResultList
      v-if="results && channelDetailsMap"
      v-bind:results="results"
      v-bind:resultsDetails="channelDetailsMap"
    ></ResultList>
  </div>
</template>

<script>
import ResultList from "../components/ResultList";
import ChannelService from "../services/ChannelService";
import SearchDetailsService from "../services/SearchDetailsService";
import PlaylistService from "../services/PlaylistService";

export default {
  name: "VideoPlayer",
  data: () => {
    return {
      videoId: null,
      videoUrl: "https://www.youtube.com/watch?v=",
      results: null,
      channelDetailsMap: null,
      channelVideosIds: "id=",
      channelPlaylistIds: "id=",
      channelFullDetails: null
    };
  },
  created() {
    const queryParams = this.$router.currentRoute.params;
    ChannelService.getChannelDetails(queryParams.id).then(res => {
      this.channelFullDetails = res.data.items[0];
      PlaylistService.getPlaylistVideos(
        res.data.items[0].contentDetails.relatedPlaylists.uploads
      ).then(listOfChannelItems => {
        this.prepareChannelQuery(listOfChannelItems.data.items);
        SearchDetailsService.getVideosDetails(this.channelVideosIds)
          .then(videoDetails => {
            SearchDetailsService.getPlaylistsDetails(this.channelPlaylistIds)
              .then(playListDetails => {
                this.channelDetailsMap = new Map();
                videoDetails.data.items?.forEach(video => {
                  this.channelDetailsMap.set(video.id, video);
                });
                playListDetails.data.items?.forEach(playlist => {
                  this.channelDetailsMap.set(playlist.id, playlist);
                });
                this.results = listOfChannelItems;
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      });
    });
    return {
      videoId: queryParams.id,
      videoUrl: (this.videoUrl += queryParams.id)
    };
  },
  methods: {
    prepareChannelQuery(items) {
      items?.forEach(item => {
        if (item.snippet.resourceId.kind === "youtube#video") {
          this.channelVideosIds += item.snippet.resourceId.videoId + ",";
        } else if (item.snippet.resourceId.kind === "youtube#playlist") {
          this.channelPlaylistIds += item.snippet.resourceId.playlistId + ",";
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
.channel-title-container {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}
.circular-img {
  border-radius: 50%;
  position: absolute;
  width: 100px;
  top: 163px;
  left: 20px;
}
.card-img-background {
  width: 100%;
  margin-top: -20%;
}
.background-img-container {
  height: 150px;
  overflow: hidden;
  margin-top: 63px;
}
.title-text {
  margin-left: 138px;
  margin-top: 15px;
}
.subscribe-button {
  width: 100px;
  margin-left: 138px;
  cursor: pointer;
}
@media (max-width: $mobile) {
  .channel-title-container {
    width: 100%;
  }
  .title-text {
    margin-bottom: 10px;
  }
  .card-img-background {
    margin-top: 0;
  }
  .background-img-container {
    margin-top: 0;
  }
  .circular-img {
    top: 100px;
  }
}
</style>
