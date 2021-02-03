<template>
  <div class="container">
    <div class="tables-container">
      <select
        class="drop-down"
        v-on:change="
          $event.target.value === 'All'
            ? onMobileFilterChange('type', null)
            : onMobileFilterChange('type', $event.target.value)
        "
      >
        <option v-bind:key="type.id" v-for="type of typeRows">{{
          type.name
        }}</option>
      </select>
      <select
        class="drop-down right-drop-down"
        onchange=" $event.target.value === 'Any time'
              ? onMobileFilterChange('uploadDate', null)
              : onMobileFilterChange('uploadDate', $event.target.value)"
      >
        <option
          v-bind:key="uploadDate.id"
          v-for="uploadDate of uploadDateRows"
          >{{ uploadDate.name }}</option
        >
      </select>
    </div>
  </div>
</template>

<script>
import SearchService from "../services/searchService";

export default {
  name: "MobileFilters",
  data() {
    return {
      uploadDateTitle: { id: "uploadDate", name: "UPLOAD DATE" },
      typeTitle: { id: "type", name: "TYPE" },
      uploadDateRows: [
        { id: "anyTime", name: "Any time" },
        { id: "lastHour", name: "Last hour" },
        { id: "today", name: "Today" },
        { id: "thisWeek", name: "This week" },
        { id: "thisMonth", name: "This Month" }
      ],
      typeRows: [
        { id: "all", name: "All" },
        { id: "video", name: "Video" },
        { id: "channel", name: "Channel" },
        { id: "playlist", name: "Playlist" }
      ],
      selectedUploadDateFilter: SearchService.getApi().uploadDate,
      selectedTypeFilter: SearchService.getApi().type
    };
  },
  methods: {
    onMobileFilterChange(filterType, value) {
      // this.setSelectedMobileFilters(filterType, value);
      this.$emit("filtersChanged", { filterType: filterType, value: value?.toLowerCase() });
    },
    // setSelectedMobileFilters(filterType, value) {
    //   filterType === "uploadDate"
    //     ? (this.selectedUploadDateFilter = value)
    //     : (this.selectedTypeFilter = value);
    // }
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
.drop-down {
  width: fit-content;
  height: 40px;
  margin: 10px 0 0 -24px;
  border: 1px solid #f0f0f0;
  background: #f8f8f8;
}
.right-drop-down {
  margin-left: 5px;
}
</style>
