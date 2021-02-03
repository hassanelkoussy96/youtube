<template>
  <div v-if="playlist && playlistDetails" class="item-container">
    <div class="img-container">
      <div class="number-of-videos">
        <h4 class="number-of-videos-text">
          {{ playlistDetails.contentDetails.itemCount }}
        </h4>
        <font-awesome-icon icon="bars" />
      </div>
      <a
        :href="'https://www.youtube.com/watch?v=' + playlist.id.videoId"
        target="_blank"
        class="card-img"
      >
        <img
          class="card-img-top"
          :src="playlist.snippet.thumbnails.medium.url"
          alt="YouTube thumbnail"
        />
      </a>
    </div>
    <div class="card-body">
      <h6 class="card-title">{{ playlist.snippet.title }}</h6>
      <p class="card-subtitle mb-2 text-muted desktop-channel-title">
        {{ playlist.snippet.channelTitle }} |
        {{ playlist.snippet.publishedAt | formatUploadDate }}
      </p>
      <p class="card-subtitle mb-2 text-muted mobile-channel-title">
        {{ video.snippet.channelTitle }}
      <p class="card-text">{{ playlist.snippet.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistThumbnail",
  props: {
    playlist: Object,
    playlistDetails: Object
  },
  data() {
    return {
      showFilters: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mobile: 640px;

.item-container {
  width: 60%;
  margin: 0 auto 10px auto;
  overflow: auto;
}
.card-img-top {
  width: 100%;
}
.card-body {
  display: inline-block;
  width: 68%;
  float: right;
}
.card-img {
  display: inline-block;
  width: 100%;
}
.card-title {
  font-size: 16px;
  margin: 0;
}
.card-subtitle {
  font-size: 12px;
  color: #9b9b9b;
  margin-top: 4px;
}
.card-text {
  font-size: 12px;
  color: #9b9b9b;
}
.number-of-videos {
  width: 30%;
  height: 96%;
  padding: 0 5px 2px 5px;
  position: absolute;
  background-color: rgba(54, 54, 53, 0.9);
  right: 0;
  top: 0;
  color: #ffffff;
  justify-content: center;
  font-size: 1.1vw;
  text-align: center;
}
.number-of-videos-text {
  margin-top: 65%;
  margin-bottom: 2px;
}
.img-container {
  width: 30%;
  display: inline-block;
  position: relative;
}
@media (max-width: $mobile) {
  .item-container {
    width: 99%;
    padding: 0 0 5px 5px;
  }
  .card-title {
    font-size: 13px;
    margin: 0 0 0 2px;
  }
  .card-text {
    display: none;
  }
  .desktop-channel-title {
    display: none;
  }
  .mobile-channel-title {
    display: block;
  }
}
</style>
