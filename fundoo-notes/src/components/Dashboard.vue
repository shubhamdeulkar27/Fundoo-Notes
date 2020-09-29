<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button
        class="md-icon-button"
        @click="showNavigation = !showNavigation"
      >
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
        <input
          type="text"
          name="search"
          placeholder="Search"
          id="serach-input"
        />
      </div>
      <div class="md-toolbar-section-end"></div>
    </md-toolbar>

    <div id="sub-container">
      <md-drawer :md-active.sync="showNavigation" md-persistent="mini">
        <md-list>
          <router-link to="/notes">
            <md-list-item>
              <md-icon>note</md-icon>
              <span class="md-list-item-text">
                <router-link id="def-link" to="/dashboard">Notes</router-link>
              </span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-drawer>

      <md-content> <router-view /> </md-content>
    </div>
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
  height: 90vh;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
  width: 100vw;
  height: 90vh;
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
  width: 50vw;
  height: 7vh;
  line-height: 7vh;
  display: flex;
  flex-direction: row;
  position: relative;
  left: 5vw;
  padding-left: 1vw;
}
#serach-input {
  outline: none;
  border: none;
  background-color: rgb(236, 234, 234);
  font-size: 15px;
  line-height: 15px;
  margin-left: 1vw;
  width: 45vw;
}
#sub-container {
  display: flex;
  flex-direction: row;
}
</style>
