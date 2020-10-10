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
          v-model="search"
          placeholder="Search"
          id="serach-input"
          @keyup="searched()"
        />
      </div>
      <div class="md-toolbar-section-end">
        <md-menu md-direction="bottom-end">
          <div id="profile" md-menu-trigger>
            {{ this.profileData.firstName[0] }}
          </div>

          <md-menu-content id="profile-content">
            <md-menu-item>
              <div id="profile-logo">
                {{ this.profileData.firstName[0] }}
              </div></md-menu-item
            >
            <md-menu-item>{{
              profileData.firstName.charAt(0).toUpperCase() +
                profileData.firstName.slice(1) +
                " " +
                profileData.lastName.charAt(0).toUpperCase() +
                profileData.lastName.slice(1)
            }}</md-menu-item>
            <md-menu-item>{{ profileData.email }}</md-menu-item>
            <md-menu-item
              ><md-button class="md-accent" @click="logout()"
                >Sign out</md-button
              ></md-menu-item
            >
          </md-menu-content>
        </md-menu>
      </div>
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

          <router-link to="/archived">
            <md-list-item>
              <md-icon>archive</md-icon>
              <span class="md-list-item-text">
                <router-link id="def-link" to="/dashboard">Archive</router-link>
              </span>
            </md-list-item>
          </router-link>

          <router-link to="/trashed">
            <md-list-item>
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">
                <router-link id="def-link" to="/dashboard">Trash</router-link>
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
import { EventBus } from "../event-bus.js";
export default {
  name: "Dashboard",
  created() {
    this.profileData.firstName = localStorage.getItem("fundoo-user-firstName");
    this.profileData.lastName = localStorage.getItem("fundoo-user-lastName");
    this.profileData.email = localStorage.getItem("fundoo-user-email");
  },
  methods: {
    logout() {
      localStorage.removeItem("fundoo-token");
      localStorage.removeItem("fundoo-user-firstName");
      localStorage.removeItem("fundoo-user-lastName");
      localStorage.removeItem("fundoo-user-email");
      window.location.href = "/login";
    },
    searched() {
      EventBus.$emit("Serached", this.search);
    }
  },
  data: () => ({
    showNavigation: false,
    showSidepanel: false,
    profileData: { firstName: null, lastName: null, email: null },
    search: ""
  })
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
  width: 175px;
  height: 90vh;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
  width: 100vw;
  height: 90vh;
  overflow: auto;
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
#profile {
  height: 25px;
  width: 25px;
  color: white;
  font-size: 20px;
  padding-top: 1px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  right: 2vw;
  cursor: pointer;
}
#profile-logo {
  height: 40px;
  width: 40px;
  color: white;
  font-size: 30px;
  padding-left: 0.9vw;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 9vw;
}
.md-content {
  min-height: 95vh;
}
.md-menu-item {
  text-align: center;
}
//Moto G4
@media (min-width: 320px) and (max-width: 360px) {
  #serach-bar {
    width: 40vw;
  }
  #serach-input {
    width: 30vw;
  }
  .fa-sticky-note:before {
    display: none;
  }
  .md-toolbar.md-theme-default.md-primary .md-title {
    margin-left: 5px;
  }
  #profile-logo {
    height: 40px;
    width: 40px;
    font-size: 35px;
    line-height: 35px;
    padding-left: 3vw;
    position: absolute;
    left: 30vw;
  }
  .md-drawer {
    width: 100vw;
    height: auto;
  }
}
//Media query For Moto G4 Horizontal.
@media (min-width: 570px) and (max-width: 640px) {
  .md-drawer {
    width: 28vw;
    height: 86vh;
  }
  .md-menu-content {
    max-height: 60vh;
  }
  #profile-content {
    overflow: none;
  }
  #profile-logo {
    height: 40px;
    width: 40px;
    font-size: 35px;
    line-height: 35px;
    padding-left: 1.7vw;
    position: absolute;
    left: 19vw;
  }
}

//Ipad
@media (min-width: 700px) and (max-width: 768px) {
  #serach-bar {
    width: 40vw;
  }
  #serach-input {
    width: 30vw;
    font-size: 25px;
    line-height: 25px;
  }
  .fa-sticky-note:before {
    font-size: 35px;
  }
  .md-toolbar.md-theme-default.md-primary .md-title {
    font-size: 35px;
    line-height: 35px;
  }
  #profile-logo {
    height: 40px;
    width: 40px;
    font-size: 35px;
    line-height: 35px;
    padding-left: 1.3vw;
    position: absolute;
    left: 15vw;
  }
  #profile {
    height: 40px;
    width: 40px;
    color: white;
    font-size: 35px;
    line-height: 35px;

    background-color: blue;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    right: 2vw;
    cursor: pointer;
  }
  .md-drawer {
    width: 100vw;
    height: auto;
  }
  .md-list-item-container {
    font-size: 18px;
  }
}
//Ipad Horizontal
@media (min-width: 1000px) and (max-width: 1024px) {
}
</style>
