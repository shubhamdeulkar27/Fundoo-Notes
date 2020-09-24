<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span id="logo">
        <i class="fas fa-sticky-note"></i>
      </span>
      <span class="md-title">Fundoo</span>
      <div id="serach-bar">
        <span>
          <md-icon>search</md-icon>
        </span>
        <input type="text" name="search" placeholder="Search" />
      </div>
      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">Favorites</md-button>
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Fundoo Notes</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>note</md-icon>
          <span class="md-list-item-text">
            <router-link id="def-link" to="/dashboard">Notes</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam,
      non molestias et! Earum magnam, similique, quo recusandae placeat dicta
      asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.
    </md-content>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data: () => ({
    showNavigation: false,
    showSidepanel: false,
  }),
};
</script>
<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
}

.md-toolbar.md-theme-default.md-primary {
  color: orange;
  font-size: 22px;
  background-color: white;
}
#logo {
  margin-left: 0.5vw;
}
.md-toolbar.md-theme-default.md-primary .md-title {
  color: black;
}
.md-toolbar.md-theme-default.md-primary .md-icon {
  color: black;
}
.md-toolbar.md-theme-default.md-primary
  .md-button:not([disabled]):not(.md-raised) {
  color: black;
}
#def-link {
  color: black;
  text-decoration: none;
}
#serach-bar {
  background-color: rgb(236, 234, 234);
  border-radius: 5px;
  width: 40vw;
  height: 7vh;
  line-height: 7vh;
  display: flex;
  flex-direction: row;

  position: relative;
  left: 15vw;
}
</style>
