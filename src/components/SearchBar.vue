<template>
  <div class="nav-bar-container">
    <div>
      <img
        src="../assets/youtube-logo.png"
        alt=""
        class="desktop-logo"
        v-on:click="navigateToHome"
      />
      <font-awesome-icon :icon="['fab', 'youtube']" class="mobile-logo" />
      <label
        v-bind:class="{
          'search-field-container-mobile': hideSearchField
        }"
      >
        <input
          v-model="searchString"
          class="search-field"
          type="text"
          placeholder="Search"
          v-on:keypress.enter="search(searchString)"
        />
        <button class="search-button" v-on:click="search(searchString)">
          <font-awesome-icon icon="search" class="search-button-icon" />
        </button>
      </label>
      <p v-if="hideSearchField && !searchString" class="youtube-text">YouTube</p>
      <p v-if="hideSearchField && searchString" class="youtube-text">{{searchString}}</p>
      <font-awesome-icon
        icon="search"
        class="mobile-search-icon"
        v-on:click="showSearchFieldMobile()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchString: null,
      hideSearchField: true
    };
  },
  methods: {
    showSearchFieldMobile() {
      this.hideSearchField = !this.hideSearchField;
    },
    search(searchString) {
      if (this.$router.currentRoute.name === "Search") {
        this.$router.push("/").then(() => {
          this.$router.push({
            name: "Search",
            query: { query: searchString }
          });
        });
      } else {
        this.$router.push({
          name: "Search",
          query: { query: searchString }
        });
      }
    },
    navigateToHome() {
      this.searchString = null;
      this.$router.push("/").catch(() => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mobile: 640px;
$dark-grey: #9b9b9b;

.nav-bar-container {
  padding-top: 13px;
  height: 50px;
  background-color: #ffffff;
  text-align: center;
  position: fixed;
  z-index: 100;
  width: 100%;
}
.youtube-text {
  display: none;
}
.search-field {
  border-radius: 2px 0 0 2px;
  border: 1px solid #d3d3d3;
  border-right: none;
  height: 30px;
  width: 35%;
  font-size: 14px;
  padding: 0 6px;
}
.search-field:focus {
  outline: none;
  border-radius: 2px 0 0 2px;
  border: 1px solid #d3d3d3;
  border-right: none;
}
.search-button:focus {
  outline: none;
}
.search-button:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
.search-button {
  background-color: #f8f8f8;
  border-radius: 0 2px 2px 0;
  border: 1px solid #d3d3d3;
  height: 32px;
  width: 65px;
  font-size: 14px;
  padding: 0 6px;
}
.search-button-icon {
  color: $dark-grey;
}
.desktop-logo {
  width: 80px;
  vertical-align: middle;
  margin-right: 179px;
  cursor: pointer;
}
.mobile-logo {
  display: none;
}
.mobile-search-icon {
  display: none;
}
@media (max-width: $mobile) {
  .desktop-logo {
    display: none;
  }
  .search-field {
    height: 40px;
  }
  .search-button {
    height: 42px;
  }
  .mobile-logo {
    float: left;
    display: inline;
    width: 50px;
    margin: 0 15px 0 8px;
    font-size: 40px;
    color: #ffffff;
  }
  .nav-bar-container {
    background-color: #e62117;
  }
  .mobile-search-icon {
    display: inline;
    float: right;
    width: 25px;
    margin: 0 15px 0 8px;
    font-size: 40px;
    color: #ffffff;
  }
  .search-button {
    display: none;
  }
  .search-field {
    width: 64%;
    border-radius: 2px;
  }
  .search-field-container-mobile {
    display: none;
  }
  .youtube-text {
    display: inline-block;
    font-size: 25px;
    margin-block: 0.25em;
    color: #ffffff;
    float: left;
    font-weight: 600;
  }
  .nav-bar-container {
    position: inherit;
  }
}
</style>
