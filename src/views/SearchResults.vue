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
    <filters
      v-if="showFilters"
      v-on:uploadDate="onUploadDateFilterChange(uploadDate)"
      v-on:type="onTypeFilterChange(type)"
      v-on:sorting="onSortingFilterChange(sorting)"
    />
    <div v-if="results">
      <ResultList v-bind:results="results"></ResultList>
    </div>
  </div>
</template>

<script>
import Filters from "../components/Filters";
import ResultList from "../components/ResultList";

export default {
  name: "SearchResults",
  props: {
    results: Object
  },
  components: {
    Filters,
    ResultList
  },
  data() {
    !this.results ? this.$router.push("/") : null;
    return {
      showFilters: false
    };
  },
  methods: {
    showOrHideFilters() {
      this.showFilters = !this.showFilters;
    },
    onUploadDateFilterChange(uploadDate) {
      this.api.uploadDate = uploadDate;
    },
    onTypeFilterChange(type) {
      this.api.type = type;
    },
    onSortingFilterChange(order) {
      this.api.order = order;
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
