<template>
  <div class="container">
    <div class="tables-container">
      <div class="col col1and2">
        <h5 class="title">UPLOAD DATE</h5>
        <div v-bind:key="row.id" v-for="row of uploadDateRows">
          <h6
            class="table-body-data"
            v-on:click="onFilterChange('uploadDate', row.id)"
            v-bind:class="{
              'selected-filter': row.id === selectedUploadDateFilter
            }"
          >
            {{ row.name }}
          </h6>
          <font-awesome-icon
            v-if="row.id === selectedUploadDateFilter"
            icon="times"
            class="deselect-icon"
            v-on:click="onFilterChange('uploadDate', null)"
          />
        </div>
      </div>
      <div class="col col1and2">
        <h5 class="title">TYPE</h5>
        <div v-bind:key="row.id" v-for="row of typeRows">
          <h6
            class="table-body-data"
            v-on:click="onFilterChange('type', row.id)"
            v-bind:class="{
              'selected-filter': row.id === selectedTypeFilter
            }"
          >
            {{ row.name }}
          </h6>
          <font-awesome-icon
            v-if="row.id === selectedTypeFilter"
            icon="times"
            class="deselect-icon"
            v-on:click="onFilterChange('type', null)"
          />
        </div>
      </div>
      <div class="col">
        <h5 class="title">SORT BY</h5>
        <div v-bind:key="row.id" v-for="row of sortByRows">
          <h6
            class="table-body-data"
            v-on:click="onFilterChange('sortingBy', row.id)"
            v-bind:class="{
              'selected-filter': row.id === selectedSortingFilter
            }"
          >
            {{ row.name }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchService from "../services/searchService";

export default {
  name: "Filters",
  data() {
    return {
      uploadDateTitle: { id: "uploadDate", name: "UPLOAD DATE" },
      typeTitle: { id: "type", name: "TYPE" },
      sortByTitle: { id: "sortBy", name: "SORT BY" },
      uploadDateRows: [
        { id: "lastHour", name: "Last hour" },
        { id: "today", name: "Today" },
        { id: "thisWeek", name: "This week" },
        { id: "thisMonth", name: "This Month" }
      ],
      typeRows: [
        { id: "video", name: "Video" },
        { id: "channel", name: "Channel" },
        { id: "playlist", name: "Playlist" }
      ],
      sortByRows: [
        { id: "relevance", name: "Relevance" },
        { id: "uploadDate", name: "Upload date" },
        { id: "viewCount", name: "View count" },
        { id: "rating", name: "Rating" }
      ],
      selectedUploadDateFilter: SearchService.getApi().uploadDate,
      selectedTypeFilter: SearchService.getApi().type,
      selectedSortingFilter: SearchService.getApi().order
    };
  },
  methods: {
    onFilterChange(filterType, value) {
      this.setSelectedFilters(filterType, value);
      SearchService.applyFilters(filterType, value)
        .then(res => {
          this.$router.push("/").catch(() => {});
          this.$router
            .push({
              name: "Search",
              params: { results: res }
            })
            .catch(() => {});
        })
        .catch(error => console.log(error));
    },
    setSelectedFilters(filterType, value) {
      filterType === "uploadDate"
        ? (this.selectedUploadDateFilter = value)
        : filterType === "type"
        ? (this.selectedTypeFilter = value)
        : (this.selectedSortingFilter = value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  justify-content: center;
}
.tables-container {
  display: flex;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
}
.table {
  margin-left: auto;
  margin-right: auto;
  display: inline;
}
.table1 {
  margin-right: 20px;
}
.table2 {
  margin-right: 20px;
}
.table-headers {
  text-align: inherit;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid #f0f0f0;
}
.table-body-data {
  cursor: pointer;
  color: #9b9b9b;
}
.table-body {
  color: #9b9b9b;
}
.col {
  display: inline-block;
  width: 30%;
}
.col1and2 {
  margin-right: 64px;
}
.title {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}
.selected-filter {
  font-weight: 600;
  color: #000000;
  display: inline;
}
.deselect-icon {
  float: right;
  width: 0.5em;
  height: 18px;
}
</style>
