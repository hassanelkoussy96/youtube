<template>
  <div class="outer-container">
    <div
      class="top-bar"
      v-bind:class="{
        'top-bar-bottom-border': !showFilters
      }"
    >
      <h4 class="results">
        About {{ results ? results.data.pageInfo.totalResults : 0 }} results
      </h4>
      <div
        class="filter-icon-and-text"
        v-bind:class="{
          'filter-icon-and-text-bold': showFilters
        }"
        v-on:click="showOrHideFilters"
      >
        <font-awesome-icon icon="filter" class="filter-icon" />
        Filter
      </div>
    </div>
    <filters v-if="showFilters" v-on:filtersChanged="applyFilter($event)" />
    <div v-if="results && detailsMap">
      <ResultList
        v-bind:results="results"
        v-bind:resultsDetails="detailsMap"
      ></ResultList>
    </div>
  </div>
</template>

<script>
import Filters from "../components/Filters";
import ResultList from "../components/ResultList";
import SearchService from "../services/searchService";
import SearchDetailsService from "../services/SearchDetailsService";
export default {
  name: "SearchResults",
  components: {
    Filters,
    ResultList
  },
  data() {
    return {
      showFilters: false,
      results: null,
      resultsDetails: null,
      videosIds: "id=",
      playlistsIds: "id=",
      channelsIds: "id=",
      detailsMap: null
    };
  },
  created() {
    const searchString = this.$router.currentRoute.query;
    this.getSearchResults(searchString);
  },
  methods: {
    showOrHideFilters() {
      this.showFilters = !this.showFilters;
    },
    getSearchResults(searchString) {
      SearchService.search(searchString.query)
        .then(res => {
          this.separateItems(res.data.items);
          SearchDetailsService.getVideosDetails(this.videosIds)
            .then(videoDetails => {
              SearchDetailsService.getPlaylistsDetails(this.playlistsIds)
                .then(playlistDetails => {
                  SearchDetailsService.getChannelsDetails(this.channelsIds)
                    .then(channelDetails => {
                      this.detailsMap = new Map();
                      videoDetails.data.items?.forEach(video => {
                        this.detailsMap.set(video.id, video);
                      });
                      playlistDetails.data.items?.forEach(playlist => {
                        this.detailsMap.set(playlist.id, playlist);
                      });
                      channelDetails.data.items?.forEach(channel => {
                        this.detailsMap.set(channel.id, channel);
                      });
                      console.log(this.detailsMap);
                      console.log(res.data.items);
                      this.results = res;
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    applyFilter(filters) {
      SearchService.applyFilters(filters.filterType, filters.value)
        .then(res => {
          this.results = res;
        })
        .catch(error => console.log(error));
    },
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-icon-and-text {
  color: #9b9b9b;
  float: right;
  margin: 10px 10px 0 0;
  cursor: pointer;
}
.top-bar {
  width: 60%;
  margin-right: auto;
  margin-left: auto;
  display: table;
  margin-bottom: 10px;
  padding: 20px 0 10px 0;
}
.top-bar-bottom-border {
  border-bottom: 1px solid #f0f0f0;
}
.results {
  display: inline-block;
  margin: 10px 0 0 0;
  font-weight: inherit;
}
.filter-icon-and-text-bold {
  color: #000000;
  font-weight: 600;
}
.filter-icon {
  width: 12px;
  vertical-align: -0.2em;
}
</style>
