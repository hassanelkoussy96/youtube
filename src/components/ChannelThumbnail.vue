<template>
  <div v-if="channelDetails && channel" class="item-container">
    <div class="img-container">
      <a target="_blank" class="card-img" v-on:click="onChannelClicked">
        <img
          class="card-img-top"
          :src="channel.snippet.thumbnails.medium.url"
          alt="YouTube thumbnail"
        />
      </a>
    </div>
    <div class="card-body">
      <h6 class="card-title">{{ channel.snippet.title }}</h6>
      <p class="card-subtitle mb-2 text-muted desktop-channel-title">
        {{ channel.snippet.channelTitle }} |
        {{ channel.snippet.publishedAt | formatUploadDate }}
      </p>
      <p class="card-subtitle mb-2 text-muted mobile-channel-title">
        {{ channel.snippet.channelTitle }}
      <p class="card-text">{{ channel.snippet.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChannelThumbnail",
  props: {
    channel: Object,
    channelDetails: Object
  },
  methods: {
    onChannelClicked() {
      this.$router.push({
        name: "Channel",
        params: { id: this.channel.id.channelId }
      });
    }
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
  width: 60%;
  border-radius: 50%;
}
.card-body {
  display: inline-block;
  width: 68%;
  float: right;
}
.card-img {
  display: inline-block;
  width: 100%;
  text-align: center;
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
