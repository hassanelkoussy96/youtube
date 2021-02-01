<template>
  <div v-if="video" class="item-container">
    <div class="img-container">
      <div class="video-duration">duration</div>
      <a
        :href="'https://www.youtube.com/watch?v=' + video.id.videoId"
        target="_blank"
        class="card-img"
      >
        <img
          class="card-img-top"
          :src="video.snippet.thumbnails.medium.url"
          alt="YouTube thumbnail"
        />
      </a>
    </div>
    <div class="card-body">
      <h6 class="card-title">{{ video.snippet.title }}</h6>
      <p class="card-subtitle mb-2 text-muted">
        {{ video.snippet.channelTitle }} |
        {{ video.snippet.publishedAt | formatDate }}
      </p>
      <p class="card-text">{{ video.snippet.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoItem",
  props: {
    video: Object
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
.video-duration {
  border-radius: 4px;
  width: fit-content;
  padding: 0 5px 2px 5px;
  position: absolute;
  background-color: rgba(54, 54, 53, 0.9);
  right: 5px;
  bottom: 10px;
  color: #ffffff;
  font-size: 1.1vw;
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
}
</style>
